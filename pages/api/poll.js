// API route for handling poll votes
import { db } from '../../lib/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitStore = new Map();

function getRateLimitKey(ip, pollId) {
  return `poll-${pollId}-${ip}`;
}

function getFingerprint(req) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const acceptCharset = req.headers['accept-charset'] || '';
  const accept = req.headers['accept'] || '';
  const dnt = req.headers['dnt'] || '';
  const connection = req.headers['connection'] || '';
  
  const raw = `${userAgent}-${acceptLanguage}-${acceptEncoding}-${acceptCharset}-${accept}-${dnt}-${connection}`;
  return raw.replace(/[^a-zA-Z0-9]/g, '').substring(0, 64);
}

async function checkRateLimit(ip, pollId, fingerprint, db) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxVotes = 3; // Max 3 votes per hour per IP

  // Check in-memory rate limiting (fast)
  const ipKey = getRateLimitKey(ip, pollId);
  const ipData = rateLimitStore.get(ipKey);
  if (ipData && ipData.count >= maxVotes && (now - ipData.firstVote) < windowMs) {
    return { allowed: false, reason: 'IP rate limit exceeded' };
  }

  // Check Firestore for persistent IP vote record
  const ipVotesRef = collection(db, 'ip_votes');
  const ipQuery = query(ipVotesRef, where('pollId', '==', pollId), where('ip', '==', ip.substring(0, 45)));
  const ipVotes = await getDocs(ipQuery);
  if (!ipVotes.empty) {
    return { allowed: false, reason: 'IP rate limit exceeded' };
  }

  return { allowed: true };
}

function updateRateLimit(ip, pollId, fingerprint) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  
  // Update IP rate limit
  const ipKey = getRateLimitKey(ip, pollId);
  const ipData = rateLimitStore.get(ipKey) || { count: 0, firstVote: now };
  ipData.count += 1;
  ipData.firstVote = ipData.firstVote || now;
  rateLimitStore.set(ipKey, ipData);
  
  // Update fingerprint rate limit
  const fingerprintKey = `fingerprint-${pollId}-${fingerprint}`;
  const fingerprintData = rateLimitStore.get(fingerprintKey) || { count: 0, firstVote: now };
  fingerprintData.count += 1;
  fingerprintData.firstVote = fingerprintData.firstVote || now;
  rateLimitStore.set(fingerprintKey, fingerprintData);
  
  // Clean old entries
  if (now % (60 * 1000) < 1000) { // Clean every minute
    for (const [key, data] of rateLimitStore.entries()) {
      if (now - data.firstVote > windowMs) {
        rateLimitStore.delete(key);
      }
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pollId, optionId, question, options } = req.body;

    if (!pollId || !optionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get client IP and fingerprint
    const ip = req.headers['x-forwarded-for'] || 
              req.headers['x-real-ip'] || 
              req.connection?.remoteAddress || 
              req.socket?.remoteAddress || 
              'unknown';
    
    const fingerprint = getFingerprint(req);

    // Check rate limits
    const rateLimitCheck = await checkRateLimit(ip, pollId, fingerprint, db);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ error: rateLimitCheck.reason });
    }

    // Check if this fingerprint already voted in this poll
    const votesRef = collection(db, 'poll_votes');
    const voteQuery = query(votesRef, where('pollId', '==', pollId), where('fingerprint', '==', fingerprint));
    const existingVotes = await getDocs(voteQuery);

    if (!existingVotes.empty) {
      return res.status(409).json({ error: 'You have already voted in this poll' });
    }

    // Reference to the poll document
    const pollRef = doc(db, 'polls', pollId);
    const pollDoc = await getDoc(pollRef);

    if (!pollDoc.exists()) {
      // Initialize poll if it doesn't exist and we have the structure
      if (question && options) {
        const pollOptions = {};
        options.forEach(opt => {
          pollOptions[opt.id] = { label: opt.label, votes: 0 };
        });
        
        await setDoc(pollRef, {
          question,
          options: pollOptions,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        return res.status(404).json({ error: 'Poll not found - needs initialization' });
      }
    }

    // Update the vote count
    const pollData = (await getDoc(pollRef)).data();
    const updatedOptions = { ...pollData.options };
    updatedOptions[optionId] = {
      ...updatedOptions[optionId],
      votes: (updatedOptions[optionId]?.votes || 0) + 1
    };

    await setDoc(pollRef, {
      ...pollData,
      options: updatedOptions,
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Record the individual vote for tracking
    await setDoc(doc(votesRef), {
      pollId,
      optionId,
      fingerprint,
      ip: ip.substring(0, 45), // Truncate IP for privacy
      votedAt: serverTimestamp()
    });

    // Store persistent IP vote record in Firestore
    const ipVotesRef = collection(db, 'ip_votes');
    await setDoc(doc(ipVotesRef), {
      pollId,
      ip: ip.substring(0, 45),
      votedAt: serverTimestamp()
    });

    // Update in-memory rate limiting
    updateRateLimit(ip, pollId, fingerprint);

    // Return updated poll data
    const updatedDoc = await getDoc(pollRef);
    res.status(200).json({ 
      success: true, 
      data: updatedDoc.data() 
    });

  } catch (error) {
    console.error('Poll vote error:', error);
    res.status(500).json({ error: 'Failed to record vote' });
  }
}

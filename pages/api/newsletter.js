// API route for newsletter subscriptions
import { db } from '../../lib/firebase';
import { collection, doc, getDoc, setDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// Simple in-memory rate limiting for newsletter
const newsletterRateLimitStore = new Map();

function getNewsletterRateLimitKey(ip) {
  return `newsletter-${ip}`;
}

async function checkNewsletterRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxSubscriptions = 5; // Max 5 subscriptions per hour per IP
  
  const key = getNewsletterRateLimitKey(ip);
  const data = newsletterRateLimitStore.get(key);
  
  if (data && data.count >= maxSubscriptions && (now - data.firstAttempt) < windowMs) {
    return { allowed: false, reason: 'Too many subscription attempts' };
  }
  
  return { allowed: true };
}

function updateNewsletterRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  
  const key = getNewsletterRateLimitKey(ip);
  const data = newsletterRateLimitStore.get(key) || { count: 0, firstAttempt: now };
  data.count += 1;
  data.firstAttempt = data.firstAttempt || now;
  newsletterRateLimitStore.set(key, data);
  
  // Clean old entries
  if (now % (60 * 1000) < 1000) { // Clean every minute
    for (const [key, data] of newsletterRateLimitStore.entries()) {
      if (now - data.firstAttempt > windowMs) {
        newsletterRateLimitStore.delete(key);
      }
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Get client IP
    const ip = req.headers['x-forwarded-for'] || 
              req.headers['x-real-ip'] || 
              req.connection?.remoteAddress || 
              req.socket?.remoteAddress || 
              'unknown';

    // Check rate limits
    const rateLimitCheck = await checkNewsletterRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ error: rateLimitCheck.reason });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const subscriptionsRef = collection(db, 'newsletter_subscriptions');
    const q = query(subscriptionsRef, where('email', '==', email));
    const existingDocs = await getDocs(q);

    if (!existingDocs.empty) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    // Add new subscription
    const newSubscription = {
      email: email.toLowerCase(),
      subscribedAt: serverTimestamp(),
      source: 'robinhood-article', // Track where the subscription came from
      status: 'active',
      ip: ip.substring(0, 45) // Truncate IP for privacy
    };

    await setDoc(doc(subscriptionsRef), newSubscription);

    // Update rate limiting
    updateNewsletterRateLimit(ip);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
}

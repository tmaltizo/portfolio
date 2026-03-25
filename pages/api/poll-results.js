// API route for getting poll results
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pollId } = req.query;

    if (!pollId) {
      return res.status(400).json({ error: 'Poll ID is required' });
    }

    const pollRef = doc(db, 'polls', pollId);
    const pollDoc = await getDoc(pollRef);

    if (!pollDoc.exists()) {
      // Return empty poll data if none exists - let the frontend handle initialization
      return res.status(200).json({
        question: '',
        options: {}
      });
    }

    res.status(200).json(pollDoc.data());

  } catch (error) {
    console.error('Poll results error:', error);
    res.status(500).json({ error: 'Failed to fetch poll results' });
  }
}

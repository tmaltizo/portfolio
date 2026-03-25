import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [testResult, setTestResult] = useState('Loading...');
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function testFirebase() {
      try {
        // Test Firestore connection
        const testCollection = collection(db, 'test');
        const snapshot = await getDocs(testCollection);
        
        // Test Auth
        const currentUser = auth.currentUser;
        
        setTestResult(`✅ Firebase connected successfully! Firestore accessible, Auth ready.`);
        setUser(currentUser);
      } catch (error) {
        setTestResult(`❌ Firebase error: ${error.message}`);
        console.error('Firebase test error:', error);
      }
    }

    testFirebase();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Firebase Connection Test</h3>
      <p className="text-sm">{testResult}</p>
      {user && <p className="text-sm text-green-600 mt-1">User authenticated: {user.email}</p>}
    </div>
  );
}

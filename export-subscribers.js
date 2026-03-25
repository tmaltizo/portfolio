// Export newsletter subscribers from Firestore to CSV
// Run with: node export-subscribers.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function exportSubscribers() {
  console.log('📧 Exporting newsletter subscribers...\n');
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Get all newsletter subscriptions
    const newsletterRef = collection(db, 'newsletter_subscriptions');
    const snapshot = await getDocs(newsletterRef);
    
    if (snapshot.empty) {
      console.log('❌ No subscribers found');
      return;
    }
    
    // Create CSV content
    let csvContent = 'Email,Subscribed At,Source,Status\n';
    const emails = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      const subscribedAt = data.subscribedAt?.toDate?.()?.toISOString() || 'Unknown';
      const source = data.source || 'Unknown';
      const status = data.status || 'active';
      
      csvContent += `"${email}","${subscribedAt}","${source}","${status}"\n`;
      emails.push(email);
    });
    
    // Save CSV file
    const csvFileName = 'newsletter-subscribers.csv';
    fs.writeFileSync(csvFileName, csvContent);
    
    // Create simple email list for Gmail
    const emailListFileName = 'email-list-for-gmail.txt';
    const emailListContent = emails.join(', ');
    fs.writeFileSync(emailListFileName, emailListContent);
    
    console.log(`✅ Export complete!`);
    console.log(`   📄 CSV file: ${csvFileName}`);
    console.log(`   📧 Email list: ${emailListFileName}`);
    console.log(`   👥 Total subscribers: ${emails.length}`);
    
    console.log('\n📋 How to use:');
    console.log('1. Open newsletter-subscribers.csv in Excel/Google Sheets');
    console.log('2. Copy emails from email-list-for-gmail.txt');
    console.log('3. Paste into Gmail BCC field (to protect privacy)');
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportSubscribers();

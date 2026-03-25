// Test script for spam protection features
// Run this with: node test-spam-protection.js

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Test-Bot/1.0',
        'X-Forwarded-For': '192.168.1.100', // Simulate IP
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let data = null;
        try {
          data = body ? JSON.parse(body) : null;
        } catch (e) {
          data = { raw: body };
        }
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testPollRateLimit() {
  console.log('\n🗳️  Testing Poll Rate Limiting...');
  
  const pollData = { pollId: 'rh-gold-poll-v1', optionId: 'yes' };
  
  // First vote should succeed
  console.log('Vote 1:');
  const result1 = await makeRequest('/api/poll', pollData);
  console.log(`Status: ${result1.status}`, result1.data);
  
  // Second vote should succeed (different fingerprint)
  console.log('\nVote 2 (different fingerprint):');
  const result2 = await makeRequest('/api/poll', pollData);
  console.log(`Status: ${result2.status}`, result2.data);
  
  // Third vote should succeed
  console.log('\nVote 3:');
  const result3 = await makeRequest('/api/poll', pollData);
  console.log(`Status: ${result3.status}`, result3.data);
  
  // Fourth vote should be rate limited
  console.log('\nVote 4 (should be rate limited):');
  const result4 = await makeRequest('/api/poll', pollData);
  console.log(`Status: ${result4.status}`, result4.data);
}

async function testNewsletterRateLimit() {
  console.log('\n📧 Testing Newsletter Rate Limiting...');
  
  const emails = [
    'test1@example.com',
    'test2@example.com', 
    'test3@example.com',
    'test4@example.com',
    'test5@example.com',
    'test6@example.com' // This should be rate limited
  ];
  
  for (let i = 0; i < emails.length; i++) {
    console.log(`\nEmail ${i + 1}: ${emails[i]}`);
    const result = await makeRequest('/api/newsletter', { email: emails[i] });
    console.log(`Status: ${result.status}`, result.data);
    
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function testDuplicateEmail() {
  console.log('\n🔄 Testing Duplicate Email Protection...');
  
  const email = 'duplicate-test@example.com';
  
  // First subscription should succeed
  console.log('First subscription:');
  const result1 = await makeRequest('/api/newsletter', { email });
  console.log(`Status: ${result1.status}`, result1.data);
  
  // Second subscription should fail
  console.log('\nSecond subscription (should fail):');
  const result2 = await makeRequest('/api/newsletter', { email });
  console.log(`Status: ${result2.status}`, result2.data);
}

async function testInvalidEmail() {
  console.log('\n❌ Testing Invalid Email Validation...');
  
  const invalidEmails = [
    'invalid-email',
    'test@',
    '@example.com',
    'test@.com',
    ''
  ];
  
  for (const email of invalidEmails) {
    console.log(`\nTesting: "${email}"`);
    const result = await makeRequest('/api/newsletter', { email });
    console.log(`Status: ${result.status}`, result.data);
  }
}

async function testPollResults() {
  console.log('\n📊 Testing Poll Results API...');
  
  const result = await makeRequest('/api/poll-results?pollId=rh-gold-poll-v1');
  console.log(`Status: ${result.status}`);
  console.log('Poll data:', JSON.stringify(result.data, null, 2));
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting Spam Protection Tests...\n');
  
  try {
    await testPollResults();
    await testPollRateLimit();
    await testNewsletterRateLimit();
    await testDuplicateEmail();
    await testInvalidEmail();
    
    console.log('\n✅ All tests completed!');
    console.log('\n📝 Test Summary:');
    console.log('- Poll rate limiting should block after 3 votes per IP');
    console.log('- Newsletter rate limiting should block after 5 attempts per IP');
    console.log('- Duplicate emails should be rejected');
    console.log('- Invalid emails should be rejected');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { makeRequest, runTests };

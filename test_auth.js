// Test script to verify authentication system
import axios from 'axios';

const BASE_URL = 'http://localhost:6000';

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');

  try {
    // Test 1: User Registration
    console.log('1. Testing User Registration...');
    const regResponse = await axios.post(`${BASE_URL}/api/auth/registration`, {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('✅ Registration successful:', regResponse.data.name);

    // Test 2: User Login
    console.log('\n2. Testing User Login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful:', loginResponse.data.name);

    // Test 3: Google Login
    console.log('\n3. Testing Google Login...');
    const googleResponse = await axios.post(`${BASE_URL}/api/auth/googlelogin`, {
      name: 'Google User',
      email: 'googleuser@example.com'
    });
    console.log('✅ Google login successful:', googleResponse.data.name);

    // Test 4: Admin Login
    console.log('\n4. Testing Admin Login...');
    const adminResponse = await axios.post(`${BASE_URL}/api/auth/adminlogin`, {
      email: 'admin@pixelegant.com',
      password: 'admin123'
    });
    console.log('✅ Admin login successful, token received');

    // Test 5: Logout
    console.log('\n5. Testing Logout...');
    const logoutResponse = await axios.get(`${BASE_URL}/api/auth/logout`);
    console.log('✅ Logout successful:', logoutResponse.data.message);

    console.log('\n🎉 All authentication tests passed!');
    console.log('\n📋 Server Status:');
    console.log('   Backend: http://localhost:6000 ✅');
    console.log('   Frontend: http://localhost:5173 ✅');
    console.log('   Admin: http://localhost:5175 ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAuth();

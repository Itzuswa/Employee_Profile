// Simple test script to check API connectivity
const axios = require('axios');

const testEmployee = {
  emp_id: 'TEST001',
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  department: 'IT',
  designation: 'Test Engineer',
  joining_date: new Date().toISOString().split('T')[0],
  status: 'Active',
  address: 'Test Address'
};

async function testAPI() {
  try {
    console.log('Testing API connection...');
    console.log('Sending data:', testEmployee);
    
    const response = await axios.post('http://localhost:5000/api/employees', testEmployee);
    console.log('✅ Success! Employee created:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAPI();

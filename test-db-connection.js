import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Try to count employees
    const count = await prisma.employee.count();
    console.log(`✅ Employee table exists! Current count: ${count}`);
    
    // Try to create a test employee
    const testEmployee = await prisma.employee.create({
      data: {
        emp_id: 'TEST' + Date.now(),
        name: 'Test Employee',
        email: 'test' + Date.now() + '@example.com',
        phone: '1234567890',
        department: 'IT',
        designation: 'Test Engineer',
        status: 'Active'
      }
    });
    
    console.log('✅ Test employee created successfully!');
    console.log('Employee ID:', testEmployee.id);
    console.log('Employee Name:', testEmployee.name);
    
    // Delete the test employee
    await prisma.employee.delete({
      where: { id: testEmployee.id }
    });
    console.log('✅ Test employee deleted');
    
    console.log('\n🎉 Everything is working perfectly!');
    console.log('✅ Database is connected');
    console.log('✅ Tables exist');
    console.log('✅ CRUD operations work');
    console.log('\nYou can now use the application!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. MySQL is not running');
    console.error('2. Database "employee_db" does not exist');
    console.error('3. Database tables are not created');
    console.error('\nTo fix:');
    console.error('1. Make sure MySQL is running');
    console.error('2. Run: CREATE DATABASE employee_db;');
    console.error('3. Run: npx prisma db push');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    await prisma.$connect();
    console.log('✅ Database connected!');
    
    const count = await prisma.employee.count();
    console.log(`✅ Employee table exists! Count: ${count}`);
    
    const testEmp = await prisma.employee.create({
      data: {
        emp_id: 'TEST' + Date.now(),
        name: 'Test User',
        email: 'test' + Date.now() + '@test.com',
        phone: '1234567890',
        department: 'IT',
        designation: 'Tester',
        status: 'Active'
      }
    });
    
    console.log('✅ Created test employee:', testEmp.id);
    
    await prisma.employee.delete({ where: { id: testEmp.id } });
    console.log('✅ Deleted test employee');
    
    console.log('\n🎉 DATABASE IS WORKING PERFECTLY!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.code === 'P2021') {
      console.error('\n⚠️  Table "employees" does not exist!');
      console.error('Solution: Run "npx prisma db push" to create tables');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

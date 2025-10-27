import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all employees with optional status filter
router.get('/', async (req, res) => {
  const { status } = req.query;
  
  try {
    const where = status && status !== 'All' ? { status } : {};
    
    const employees = await prisma.employee.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees', message: error.message });
  }
});

// Get single employee by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee', message: error.message });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  const { emp_id, name, email, phone, department, designation, joining_date, status, address, left_date } = req.body;
  
  // Log received data for debugging
  console.log('Received employee data:', req.body);
  
  try {
    // Validate required fields
    if (!emp_id || !name || !email || !phone || !department || !designation) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please fill in all required fields.' 
      });
    }
    
    const employee = await prisma.employee.create({
      data: {
        emp_id: emp_id.trim(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department: department.trim(),
        designation: designation.trim(),
        joining_date: joining_date ? new Date(joining_date) : new Date(),
        status: status || 'Active',
        address: address || null,
        left_date: left_date ? new Date(left_date) : null
      }
    });
    
    console.log('Employee created successfully:', employee.id);
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'Employee with this email or ID already exists',
        field: error.meta?.target 
      });
    }
    
    res.status(500).json({ error: 'Failed to create employee', message: error.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { emp_id, name, email, phone, department, designation, joining_date, status, address, left_date } = req.body;
  
  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        emp_id,
        name,
        email,
        phone,
        department,
        designation,
        joining_date: joining_date ? new Date(joining_date) : undefined,
        status,
        address,
        left_date: left_date ? new Date(left_date) : null
      }
    });
    
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'Employee with this email or ID already exists',
        field: error.meta?.target 
      });
    }
    
    res.status(500).json({ error: 'Failed to update employee', message: error.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.status(500).json({ error: 'Failed to delete employee', message: error.message });
  }
});

// Generate CSV report
router.get('/report/generate', async (req, res) => {
  const { status = 'All' } = req.query;
  
  try {
    const where = status !== 'All' ? { status } : {};
    
    const employees = await prisma.employee.findMany({
      where,
      select: {
        emp_id: true,
        name: true,
        email: true,
        department: true,
        designation: true,
        status: true,
        joining_date: true
      },
      orderBy: { name: 'asc' }
    });
    
    // Generate CSV
    const csvHeader = 'Employee ID,Name,Email,Department,Designation,Status,Joining Date\n';
    const csvRows = employees.map(emp => 
      `"${emp.emp_id}","${emp.name}","${emp.email}","${emp.department}","${emp.designation}","${emp.status}","${new Date(emp.joining_date).toLocaleDateString()}"`
    ).join('\n');
    
    const csv = csvHeader + csvRows;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=employees_report_${status}_${new Date().toISOString().split('T')[0]}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report', message: error.message });
  }
});

export default router;

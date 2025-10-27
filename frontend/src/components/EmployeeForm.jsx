import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import axios from 'axios';

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    emp_id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joining_date: new Date().toISOString().split('T')[0],
    status: 'Active',
    address: '',
    left_date: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`/api/employees/${id}`);
          const employee = response.data;
          setFormData({
            emp_id: employee.emp_id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            designation: employee.designation,
            joining_date: employee.joining_date ? new Date(employee.joining_date).toISOString().split('T')[0] : '',
            status: employee.status,
            address: employee.address || '',
            left_date: employee.left_date ? new Date(employee.left_date).toISOString().split('T')[0] : ''
          });
        } catch (error) {
          console.error('Error fetching employee:', error);
          setAlertMessage({ type: 'error', text: 'Failed to load employee data' });
        }
      };
      fetchEmployee();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.emp_id.trim()) newErrors.emp_id = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.joining_date) newErrors.joining_date = 'Joining date is required';
    if (formData.status === 'Left' && !formData.left_date) {
      newErrors.left_date = 'Left date is required when status is Left';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setAlertMessage({ type: 'error', text: 'Please fix the errors in the form' });
      return;
    }
    
    setIsSubmitting(true);
    setAlertMessage(null);
    
    try {
      const payload = {
        ...formData,
        left_date: formData.status === 'Left' && formData.left_date ? formData.left_date : null
      };
      
      if (isEditMode) {
        await axios.put(`/api/employees/${id}`, payload);
        setAlertMessage({ type: 'success', text: 'Employee updated successfully!' });
      } else {
        await axios.post('/api/employees', payload);
        setAlertMessage({ type: 'success', text: 'Employee added successfully!' });
      }
      
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error saving employee:', error);
      console.error('Error response:', error.response);
      
      let errorMsg = 'Failed to create employee';
      
      if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setAlertMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={() => navigate('/')}
        >
          Back to List
        </Button>
      </Box>

      {alertMessage && (
        <Alert severity={alertMessage.type} sx={{ mb: 3 }}>
          {alertMessage.text}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  error={!!errors.emp_id}
                  helperText={errors.emp_id}
                  required
                  disabled={isEditMode}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.department}>
                  <InputLabel>Department *</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    label="Department *"
                    required
                  >
                    <MenuItem value="">Select Department</MenuItem>
                    <MenuItem value="IT">Information Technology</MenuItem>
                    <MenuItem value="HR">Human Resources</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                    <MenuItem value="Customer Service">Customer Service</MenuItem>
                    <MenuItem value="R&D">Research & Development</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.department && (
                    <FormHelperText>{errors.department}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  error={!!errors.designation}
                  helperText={errors.designation}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  name="joining_date"
                  type="date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.joining_date}
                  helperText={errors.joining_date}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status *</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status *"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Left">Left</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {formData.status === 'Left' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Left Date"
                    name="left_date"
                    type="date"
                    value={formData.left_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.left_date}
                    helperText={errors.left_date}
                  />
                </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Save Employee')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

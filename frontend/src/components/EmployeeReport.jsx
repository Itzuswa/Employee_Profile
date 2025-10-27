import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert
} from '@mui/material';
import { Print as PrintIcon, FileDownload as DownloadIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import axios from 'axios';

export default function EmployeeReport() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`/api/employees?status=${statusFilter}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = () => {
    fetchEmployees();
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Employee_Report_${statusFilter}_${new Date().toLocaleDateString()}`,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 15mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background-color: #f5f5f5 !important;
          font-weight: bold;
        }
        td, th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          font-size: 12px;
        }
      }
    `,
  });

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`/api/employees/report/generate?status=${statusFilter}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `employee_report_${statusFilter}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Employee Reports
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }} className="no-print">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="report-status-filter">Filter by Status</InputLabel>
                <Select
                  labelId="report-status-filter"
                  id="report-status-select"
                  value={statusFilter}
                  label="Filter by Status"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="All">All Employees</MenuItem>
                  <MenuItem value="Active">Active Employees</MenuItem>
                  <MenuItem value="Left">Left Employees</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={handleGenerateReport}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Generate Report'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  disabled={employees.length === 0 || isLoading}
                >
                  Print
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadCSV}
                  disabled={employees.length === 0 || isLoading}
                >
                  Download CSV
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div ref={reportRef}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Employee Management System
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {statusFilter} Employees Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </Typography>
            </Box>
            
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>Employee ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Department</strong></TableCell>
                    <TableCell><strong>Designation</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Joining Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.length > 0 ? (
                    employees.map((employee) => (
                      <TableRow key={employee.id} hover>
                        <TableCell>{employee.emp_id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>
                          {new Date(employee.joining_date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        {isLoading ? 'Loading...' : 'No employees found. Click "Generate Report" to view data.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {employees.length > 0 && (
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Employees: {employees.length}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <PeopleIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<PeopleIcon />}
            sx={{ mr: 1 }}
          >
            Employees
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/employees/new"
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            Add Employee
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/report"
            startIcon={<AssessmentIcon />}
          >
            Reports
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

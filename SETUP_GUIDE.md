# 🚀 Quick Setup Guide

## Step-by-Step Instructions

### 1️⃣ Install MySQL
If you don't have MySQL installed:
- **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- **Mac**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

Start MySQL service:
```bash
# Windows: MySQL runs as a service automatically
# Mac: brew services start mysql
# Linux: sudo service mysql start
```

### 2️⃣ Create Database
Open MySQL command line or MySQL Workbench and run:
```sql
CREATE DATABASE employee_db;
```

### 3️⃣ Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Start backend server (runs on port 5000)
npm run dev
```

You should see:
```
✅ Database connected successfully
✅ Server running on port 5000
📡 API available at http://localhost:5000/api
```

### 4️⃣ Frontend Setup
Open a **NEW terminal** (keep backend running):
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### 5️⃣ Open in Browser
Visit: `http://localhost:3000`

You should see the Employee Management System!

## 🎯 Quick Test

1. Click **"Add Employee"**
2. Fill in the form:
   - Employee ID: `EMP001`
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `1234567890`
   - Department: `IT`
   - Designation: `Software Engineer`
   - Status: `Active`
3. Click **"Save Employee"**
4. You should see the employee in the list!

## 🔧 Common Issues

### ❌ "Cannot connect to database"
**Solution**: 
- Make sure MySQL is running
- Check `.env` file in backend folder
- Verify database name is `employee_db`

### ❌ "Port 5000 is already in use"
**Solution**: 
- Change port in `backend/.env`: `PORT=5001`
- Update proxy in `frontend/vite.config.js` to match new port

### ❌ "Module not found"
**Solution**: 
```bash
# In backend folder
npm install

# In frontend folder
npm install
```

### ❌ Prisma errors
**Solution**: 
```bash
cd backend
npx prisma generate
npx prisma migrate reset
npx prisma migrate dev --name init
```

## 📊 Test the Features

### Create Employee
- Click "Add Employee"
- Fill the form and save

### Edit Employee
- Click the ✏️ edit icon
- Modify fields and update

### Delete Employee
- Click the 🗑️ delete icon
- Confirm deletion

### Filter Employees
- Use the dropdown to filter by status

### Generate Report
- Click "Reports" in navbar
- Select filter
- Click "Generate Report"
- Use "Print" or "Download CSV"

## 🎓 Project Structure

```
backend/          → Express API server
├── routes/       → API endpoints
├── prisma/       → Database schema
└── server.js     → Main server file

frontend/         → React application
├── src/
│   ├── components/  → React components
│   ├── App.jsx      → Main app component
│   └── main.jsx     → Entry point
└── vite.config.js   → Vite configuration
```

## 💡 Tips

1. **Keep both terminals open** (backend + frontend)
2. **Check console** for errors if something doesn't work
3. **Use Prisma Studio** to view database: `npx prisma studio` (in backend folder)
4. **Hot reload** is enabled - changes auto-refresh!

## 🎉 You're All Set!

Your Employee Management System is now running!

**Backend**: http://localhost:5000
**Frontend**: http://localhost:3000

Happy coding! 🚀

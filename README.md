# Employee Management System

A full-stack Employee CRUD application with filtering and reporting features.

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js
- **Prisma ORM** for database management
- **MySQL** database
- RESTful API architecture

### Frontend
- **React 18** with Vite
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **react-to-print** for printing functionality

## 📁 Project Structure

```
Employee_Profile/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── routes/
│   │   └── employeeRoutes.js   # API routes
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── EmployeeList.jsx
    │   │   ├── EmployeeForm.jsx
    │   │   └── EmployeeReport.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

## 🎯 Features

### Employee Management (CRUD)
- ✅ Create new employee profiles
- ✅ View all employees in a table
- ✅ Update employee information
- ✅ Delete employees
- ✅ Form validation

### Filtering
- ✅ Filter by status (Active / Left / All)
- ✅ Real-time filtering without page reload

### Reporting
- ✅ Generate printable reports
- ✅ Export to CSV
- ✅ Filter reports by employee status
- ✅ Professional report layout

### User Experience
- ✅ Responsive design (works on all devices)
- ✅ Clean, modern Material-UI interface
- ✅ Loading states and error handling
- ✅ Confirmation dialogs for destructive actions

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/Employee_Profile.git
cd Employee_Profile
```

### Step 2: Database Setup
1. Create a MySQL database named `employee_db`:
```sql
CREATE DATABASE employee_db;
```

2. Update the database connection string in `backend/.env` if needed:
```env
DATABASE_URL="mysql://root:@localhost:3306/employee_db"
```

### Step 3: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### Step 4: Frontend Setup
Open a new terminal:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📊 Database Schema

```prisma
model Employee {
  id            Int       @id @default(autoincrement())
  emp_id        String    @unique
  name          String
  email         String    @unique
  phone         String
  department    String
  designation   String
  joining_date  DateTime  @default(now())
  status        String    @default("Active")
  address       String?
  left_date     DateTime?
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees (optional `?status=Active`) |
| GET | `/api/employees/:id` | Get single employee |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/employees/report/generate` | Generate CSV report |

## 🎨 UI Screenshots

### Employee List
- View all employees in a table
- Filter by status (Active/Left/All)
- Quick actions (Edit/Delete)

### Add/Edit Employee Form
- Comprehensive form with validation
- Auto-fill for edit mode
- Status-based conditional fields (Left Date appears when status is "Left")

### Reports
- Filterable reports
- Print functionality
- CSV export

## 🚦 Usage

### Adding an Employee
1. Click "Add Employee" button
2. Fill in all required fields
3. Select department from dropdown
4. Choose status (Active/Left)
5. Click "Save Employee"

### Editing an Employee
1. Click the edit icon (✏️) next to an employee
2. Update the information
3. Click "Update Employee"

### Deleting an Employee
1. Click the delete icon (🗑️) next to an employee
2. Confirm the deletion in the dialog

### Generating Reports
1. Navigate to "Reports" page
2. Select filter (All/Active/Left)
3. Click "Generate Report"
4. Use "Print" for printing or "Download CSV" for export

## 🔧 Configuration

### Backend Configuration (`backend/.env`)
```env
DATABASE_URL="mysql://root:@localhost:3306/employee_db"
PORT=5000
NODE_ENV=development
```

### Frontend Configuration (`frontend/vite.config.js`)
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

## 📝 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite hot module replacement
```

### Database Management
```bash
# View database in Prisma Studio
cd backend
npx prisma studio
```

## 🏗️ Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL server is running
- Check database credentials in `.env`
- Verify database `employee_db` exists

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change `port` in `frontend/vite.config.js`

### CORS Issues
- Backend includes CORS middleware by default
- If issues persist, check proxy configuration in `vite.config.js`

## 📄 License
MIT License

## 👨‍💻 Author
Uswa Fatima

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📧 Support
For support, email uswaf5667@gmail.com or create an issue in the repository.

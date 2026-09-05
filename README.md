# 🎓 School Management System - 30 Core Modules

**A complete Class 1-12 School Management System**

---

## 📋 Overview

Professional school management system for managing:
- Students (Class 1 to 12)
- Teachers & Staff
- Academics & Exams
- Fees & Invoices
- Attendance & Timetables
- Library & Transport
- Reports & Analytics

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT + HTTP-only Cookies
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

---

## 📦 30 Core Modules

### Administration (6 modules)
1. **User & Authentication** - Login, register, roles
2. **School Management** - School info, configuration
3. **Staff Management** - Non-teaching staff
4. **Inventory** - Assets & equipment
5. **Reports & Analytics** - School reports & statistics
6. **Certificates** - Student documents

### Students & Parents (4 modules)
7. **Student Management** - Student profiles, Class 1-12
8. **Parent Management** - Guardian information
9. **Admissions** - Application & enrollment
10. **Discipline** - Behavior tracking

### Academics (8 modules)
11. **Class Management** - Class 1 to 12
12. **Section Management** - Class divisions (A, B, C)
13. **Subject Management** - School subjects
14. **Academic Year** - Session management
15. **Teacher Management** - Teaching staff
16. **Timetable** - Class schedules
17. **Homework** - Assignments
18. **Attendance** - Daily tracking

### Examinations (2 modules)
19. **Exam Management** - Tests & exams
20. **Results** - Marks & grades

### Financial (3 modules)
21. **Fee Management** - Student fees
22. **Invoices** - Fee invoices & receipts
23. **Leave** - Leave applications

### Facilities (2 modules)
24. **Library** - Books & issue/return
25. **Transport** - Vehicles & routes

### Communication (3 modules)
26. **Communications** - School notices
27. **Events** - School events
28. **Notifications** - User alerts

### Portals (2 modules)
29. **Parent Portal** - Parent dashboard
30. **Student/Teacher Portal** - Role-specific access

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <your-repo-url>

# Install backend dependencies
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your configuration
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Run Backend

```bash
cd backend
npm start
```

Server runs on: `http://localhost:5000`

---

## 📚 API Endpoints

### Core Endpoints

| Module | Endpoint | Methods |
|--------|----------|---------|
| Users | `/api/users` | GET, POST, PUT, DELETE |
| Schools | `/api/schools` | GET, POST, PUT, DELETE |
| Students | `/api/students` | GET, POST, PUT, DELETE |
| Parents | `/api/parents` | GET, POST, PUT, DELETE |
| Teachers | `/api/teachers` | GET, POST, PUT, DELETE |
| Staff | `/api/staff` | GET, POST, PUT, DELETE |
| Classes | `/api/classes` | GET, POST, PUT, DELETE |
| Sections | `/api/sections` | GET, POST, PUT, DELETE |
| Subjects | `/api/subjects` | GET, POST, PUT, DELETE |
| Academic Years | `/api/academic-years` | GET, POST, PUT, DELETE |
| Admissions | `/api/admissions` | GET, POST, PUT, DELETE |
| Attendance | `/api/attendance` | GET, POST, PUT, DELETE |
| Timetables | `/api/timetables` | GET, POST, PUT, DELETE |
| Exams | `/api/exams` | GET, POST, PUT, DELETE |
| Results | `/api/results` | GET, POST, PUT, DELETE |
| Homework | `/api/homework` | GET, POST, PUT, DELETE |
| Fees | `/api/fees` | GET, POST, PUT, DELETE |
| Invoices | `/api/invoices` | GET, POST, PUT, DELETE |
| Leaves | `/api/leaves` | GET, POST, PUT, DELETE |
| Library | `/api/library` | GET, POST, PUT, DELETE |
| Transport | `/api/transports` | GET, POST, PUT, DELETE |
| Communications | `/api/communications` | GET, POST, PUT, DELETE |
| Events | `/api/events` | GET, POST, PUT, DELETE |
| Notifications | `/api/notifications` | GET, POST, PUT, DELETE |
| Reports | `/api/reports` | GET, POST |
| Certificates | `/api/certificates` | GET, POST, PUT, DELETE |
| Inventory | `/api/inventory` | GET, POST, PUT, DELETE |
| Discipline | `/api/discipline` | GET, POST, PUT, DELETE |
| Parent Portal | `/api/parent-portal` | GET |
| Student Portal | `/api/student-portal` | GET |
| Teacher Portal | `/api/teacher-portal` | GET |

---

## 🔐 User Roles

- **Admin** - Full system access
- **Teacher** - Teaching features
- **Student** - Student portal
- **Parent** - Parent portal (own children only)
- **Staff** - Staff-specific features

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── models/                # 30+ Mongoose models
├── controllers/           # 30+ Controllers
├── routes/                # 30+ Route files
├── middlewares/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── .env
├── package.json
└── index.js              # Main server file
```

---

## ✅ Features

- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Request Validation (Joi)
- ✅ Password Hashing (bcrypt)
- ✅ HTTP-only Cookies
- ✅ CORS Security
- ✅ Rate Limiting
- ✅ MongoDB Relationships
- ✅ Search & Filter
- ✅ Pagination
- ✅ Error Handling

---

## 🧪 Testing

Test with **Postman** or **Thunder Client**:

```bash
# Example: Get all students
GET http://localhost:5000/api/students

# Example: Create student
POST http://localhost:5000/api/students
Headers: { Authorization: Bearer <token> }
Body: { student data }
```

---

## 📖 Documentation

- Full API documentation: `30_CORE_MODULES_VERIFIED.md`
- Master prompt: `FINAL_MASTER_PROMPT_60_MODULES.md`

---

## 🚧 Development Status

- ✅ Backend Complete (30 modules)
- ✅ All Routes Registered
- ✅ Models & Controllers Ready
- ⏳ Frontend (Pending)

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

## 📄 License

MIT License

---

**Built for Class 1-12 School Management** 🎓

# 👥 User Roles & Permissions Guide - School Management System

## 🎯 Complete Role-Based Access Control (RBAC)

This system has **5 different user roles**, each with specific permissions and capabilities.

---

# 1️⃣ 👨‍💼 ADMIN (School Administrator)

## 🔑 **Full System Access - Super User**

### ✅ **What Admin Can Do:**

#### 📚 **Academic Management**
- ✅ Create, view, edit, and delete **ALL academic years**
- ✅ Manage **classes** and **sections** (add/edit/delete)
- ✅ Add and manage **subjects** for all classes
- ✅ Create and manage **timetables** for all classes
- ✅ Schedule **exams** for all classes
- ✅ View and manage **all results** across the school
- ✅ Override any academic data if needed

#### 👥 **User Management**
- ✅ Register and manage **all teachers**
- ✅ Register and manage **all students**
- ✅ Register and manage **all parents**
- ✅ Register and manage **all staff members**
- ✅ Assign roles to users
- ✅ Activate/deactivate user accounts
- ✅ Reset passwords for any user
- ✅ View complete user profiles

#### 📋 **Attendance & Assignments**
- ✅ View **attendance records** for all students
- ✅ Mark attendance (if teacher not available)
- ✅ View **all assignments** created by teachers
- ✅ View **all assignment submissions**
- ✅ Delete inappropriate assignments/submissions
- ✅ Override attendance records if needed

#### 💰 **Financial Management**
- ✅ Create **fee structures** for different classes
- ✅ Assign **fees to students**
- ✅ Record **fee payments** (cash/online/bank)
- ✅ Generate **payment receipts**
- ✅ View **outstanding fee reports**
- ✅ Track **fee collection statistics**
- ✅ Apply **discounts** or **fines** to fees
- ✅ View complete **fee history** of any student

#### 📚 **Library Management**
- ✅ Add **new books** to library catalog
- ✅ Edit and delete book records
- ✅ **Issue books** to students
- ✅ **Return books** from students
- ✅ Track **overdue books**
- ✅ Calculate and collect **library fines**
- ✅ View complete library statistics

#### 🎉 **Event Management**
- ✅ Create **school events** (sports day, annual function, etc.)
- ✅ Edit and delete events
- ✅ Publish events for all users
- ✅ View event registration/participation

#### 🏥 **Leave Management**
- ✅ View **all leave applications** (students, teachers, staff)
- ✅ **Approve or reject** leave requests
- ✅ Cancel leaves if needed
- ✅ View leave history and statistics

#### 📢 **Communication**
- ✅ Send **notifications** to anyone (students/teachers/parents/staff)
- ✅ Send **bulk notifications** to groups
- ✅ Create **announcements** for entire school
- ✅ View all notification history

#### 📊 **Reports & Analytics**
- ✅ Access **school dashboard** with complete statistics
- ✅ View **attendance reports** (daily/monthly/yearly)
- ✅ Generate **fee collection reports**
- ✅ View **student performance reports**
- ✅ Export reports in various formats
- ✅ View real-time analytics

#### 🏫 **School Management**
- ✅ Update **school information** (name, address, contact)
- ✅ Manage **school settings**
- ✅ View complete school statistics
- ✅ Manage multiple schools (if multi-tenant)

### ❌ **What Admin CANNOT Do:**
- ❌ Cannot delete their own admin account
- ❌ Cannot access another school's data (in multi-tenant setup)

---

# 2️⃣ 👨‍🏫 TEACHER

## 🎓 **Academic Operations & Class Management**

### ✅ **What Teacher Can Do:**

#### 📚 **Academic Management**
- ✅ View **timetable** for classes they teach
- ✅ View **subjects** they are assigned to
- ✅ View **class and section** details
- ✅ View **academic year** information

#### 📋 **Attendance Management**
- ✅ **Mark daily attendance** for their classes
- ✅ View attendance history of their students
- ✅ Update attendance records (same day only)
- ✅ View attendance statistics for their classes

#### 📝 **Assignment Management**
- ✅ **Create assignments** for their subjects/classes
- ✅ Set **due dates** for assignments
- ✅ Upload **assignment files/attachments**
- ✅ Edit their own assignments
- ✅ Delete their own assignments (if no submissions)
- ✅ Publish/unpublish assignments
- ✅ View **assignment statistics** (submitted/pending)

#### ✏️ **Grading & Evaluation**
- ✅ View **all submissions** for their assignments
- ✅ **Grade student submissions**
- ✅ Provide **written feedback** on submissions
- ✅ Return graded assignments to students
- ✅ Update grades if needed

#### 📊 **Exam & Results**
- ✅ View **exam schedules** for their subjects
- ✅ Enter **exam marks/grades** for students
- ✅ View student results for their subjects
- ✅ Update marks within allowed timeframe

#### 👥 **Student Information**
- ✅ View **student profiles** in their classes
- ✅ View student contact information
- ✅ View student attendance records
- ✅ View student performance in their subject

#### 🎉 **Events**
- ✅ View **school events**
- ✅ Create event proposals (requires admin approval)
- ✅ View event details

#### 📢 **Communication**
- ✅ Send **notifications** to their students
- ✅ Send notifications to parents of their students
- ✅ View notifications sent to them
- ✅ Respond to messages

#### 🏥 **Leave Management**
- ✅ **Apply for leave**
- ✅ View their own leave history
- ✅ Cancel their leave requests
- ✅ Assign **replacement teacher** if needed

#### 📊 **Dashboard**
- ✅ Access **teacher dashboard** with:
  - Total assignments created
  - Pending submissions to grade
  - Classes teaching
  - Students taught
  - Personal statistics

### ❌ **What Teacher CANNOT Do:**
- ❌ Cannot manage other teachers' data
- ❌ Cannot approve/reject leave requests
- ❌ Cannot manage fees
- ❌ Cannot add/edit library books
- ❌ Cannot manage school settings
- ❌ Cannot delete students or other teachers
- ❌ Cannot view admin dashboard
- ❌ Cannot access financial reports

---

# 3️⃣ 👨‍🎓 STUDENT

## 📖 **Learning & Self-Service Portal**

### ✅ **What Student Can Do:**

#### 📚 **Academic Information**
- ✅ View **own profile** (name, class, section, roll number)
- ✅ View **class timetable**
- ✅ View **subjects** enrolled in
- ✅ View **academic year** details
- ✅ View **exam schedule**

#### 📋 **Attendance**
- ✅ View **own attendance record**
- ✅ View attendance percentage
- ✅ View attendance history (daily/monthly)
- ✅ Check present/absent/late/leave status

#### 📝 **Assignments**
- ✅ View **all assigned homework/assignments**
- ✅ View assignment **details and instructions**
- ✅ Download **assignment files** from teacher
- ✅ **Submit assignments online**
- ✅ Upload assignment files/documents
- ✅ View **submission status** (submitted/graded)
- ✅ View **grades and feedback** from teacher
- ✅ Resubmit assignments (if allowed)
- ✅ View **pending assignments** with due dates

#### 📊 **Exams & Results**
- ✅ View **exam schedule** and dates
- ✅ View **own exam results**
- ✅ View **marks obtained** in each subject
- ✅ View **grades and percentages**
- ✅ View **report cards**
- ✅ Compare performance across exams

#### 💰 **Fee Information**
- ✅ View **fee structure** assigned to them
- ✅ View **total fees** (tuition, exam, library, etc.)
- ✅ View **paid amount** and **outstanding balance**
- ✅ View **payment history** with receipts
- ✅ View **payment due dates**
- ✅ Download **fee receipts**

#### 📚 **Library**
- ✅ Search **library books**
- ✅ View **available books**
- ✅ View **books issued** to them
- ✅ View **book return dates**
- ✅ View **overdue books** and fines
- ✅ Request book issue (admin approval needed)

#### 🎉 **Events**
- ✅ View **school events**
- ✅ View event details (date, time, location)
- ✅ Register for events (if registration allowed)
- ✅ View upcoming events

#### 📢 **Notifications**
- ✅ Receive **notifications** from teachers/admin
- ✅ View **all notifications** (assignments, exams, events)
- ✅ Mark notifications as **read/unread**
- ✅ View **unread notification count**

#### 🏥 **Leave Management**
- ✅ **Apply for leave**
- ✅ View leave application status
- ✅ View **leave history**
- ✅ Cancel leave requests (if not approved)

#### 📊 **Dashboard**
- ✅ Access **student dashboard** with:
  - Attendance statistics (last 30 days)
  - Assignment submission status
  - Fee payment summary
  - Recent exam results
  - Pending assignments
  - Personal performance metrics

### ❌ **What Student CANNOT Do:**
- ❌ Cannot view other students' data
- ❌ Cannot mark attendance
- ❌ Cannot create assignments
- ❌ Cannot grade assignments
- ❌ Cannot manage fees
- ❌ Cannot approve leaves
- ❌ Cannot access admin/teacher features
- ❌ Cannot edit their profile (admin only)
- ❌ Cannot view financial reports

---

# 4️⃣ 👨‍👩‍👧 PARENT

## 👪 **Monitor Children's Progress**

### ✅ **What Parent Can Do:**

#### 👶 **Children Information**
- ✅ View **all their children's profiles** (if multiple kids)
- ✅ View children's class, section, roll number
- ✅ View children's subjects

#### 📋 **Attendance Monitoring**
- ✅ View **children's attendance records**
- ✅ View attendance percentage
- ✅ View monthly attendance reports
- ✅ Get **attendance alerts** (if child is absent)

#### 📝 **Assignment Tracking**
- ✅ View **assignments** given to their children
- ✅ View assignment due dates
- ✅ Check if child has **submitted assignments**
- ✅ View **grades and feedback** on assignments
- ✅ View pending assignments

#### 📊 **Academic Performance**
- ✅ View **exam schedules** for children
- ✅ View **exam results** and report cards
- ✅ View marks in all subjects
- ✅ Track academic progress over time
- ✅ View performance statistics

#### 💰 **Fee Management**
- ✅ View **children's fee structure**
- ✅ View total fees and **outstanding balance**
- ✅ View **payment history**
- ✅ Download **fee receipts**
- ✅ View payment due dates
- ✅ Get **fee reminder notifications**

#### 📚 **Library Information**
- ✅ View books issued to their children
- ✅ View book return dates
- ✅ View overdue books and fines

#### 🎉 **Events**
- ✅ View **school events**
- ✅ Register children for events
- ✅ View event participation

#### 📢 **Communication**
- ✅ Receive **notifications** from school/teachers
- ✅ View all notifications about children
- ✅ Mark notifications as read
- ✅ Contact teachers (if messaging enabled)

#### 🏥 **Leave Management**
- ✅ **Apply leave** for their children
- ✅ View leave status and history
- ✅ Cancel leave requests

#### 📊 **Dashboard**
- ✅ View parent dashboard with:
  - Children's attendance summary
  - Recent results
  - Fee payment status
  - Upcoming events
  - Important notifications

### ❌ **What Parent CANNOT Do:**
- ❌ Cannot view other students' data (only their children)
- ❌ Cannot submit assignments (student does)
- ❌ Cannot mark attendance
- ❌ Cannot create/edit academic content
- ❌ Cannot manage fees (only view)
- ❌ Cannot access admin features
- ❌ Cannot edit children's profiles
- ❌ Cannot grade assignments

---

# 5️⃣ 👷 STAFF (Non-Teaching Staff)

## 🏢 **Administrative & Support Operations**

### ✅ **What Staff Can Do:**

#### 👥 **User Information**
- ✅ View **student profiles** (basic info)
- ✅ View **staff profiles**
- ✅ View contact information

#### 💰 **Fee Management** (if Accounts Department)
- ✅ Create and assign **fees to students**
- ✅ Record **fee payments**
- ✅ Generate **payment receipts**
- ✅ View fee collection reports
- ✅ Track outstanding fees
- ✅ Apply discounts/fines

#### 📚 **Library Management** (if Library Staff)
- ✅ Add **new books** to catalog
- ✅ Edit book information
- ✅ **Issue books** to students
- ✅ **Return books** from students
- ✅ Track **overdue books**
- ✅ Calculate library fines
- ✅ View library statistics

#### 📋 **General Tasks**
- ✅ View school information
- ✅ View academic years
- ✅ View classes and sections
- ✅ View timetables

#### 🎉 **Events**
- ✅ View school events
- ✅ Help organize events (logistics)

#### 📢 **Communication**
- ✅ Receive notifications
- ✅ View announcements
- ✅ Mark notifications as read

#### 🏥 **Leave Management**
- ✅ **Apply for own leave**
- ✅ View leave history
- ✅ Cancel leave requests

#### 📊 **Dashboard**
- ✅ View relevant department statistics
- ✅ View assigned tasks
- ✅ View notifications

### ❌ **What Staff CANNOT Do:**
- ❌ Cannot manage academic content (assignments, exams)
- ❌ Cannot mark attendance
- ❌ Cannot grade assignments
- ❌ Cannot approve leave requests
- ❌ Cannot access teacher/admin dashboards
- ❌ Cannot manage other staff members
- ❌ Cannot access areas outside their department

---

# 📊 Quick Comparison Table

| Feature | Admin | Teacher | Student | Parent | Staff |
|---------|-------|---------|---------|--------|-------|
| **Full System Access** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Manage Users** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Manage Classes** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Create Timetable** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Mark Attendance** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **View Attendance** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Create Assignments** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Submit Assignments** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Grade Assignments** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manage Exams** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **View Results** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Manage Fees** | ✅ | ❌ | ❌ | ❌ | ✅* |
| **View Fees** | ✅ | ❌ | ✅ | ✅ | ✅* |
| **Library Management** | ✅ | ❌ | ❌ | ❌ | ✅* |
| **View Library** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Create Events** | ✅ | ✅* | ❌ | ❌ | ❌ |
| **View Events** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apply Leave** | ❌ | ✅ | ✅ | ❌ | ✅ |
| **Approve Leave** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Send Notifications** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **View Dashboard** | ✅ | ✅ | ✅ | ✅ | ✅ |

**Note:** ✅* = Limited access based on department

---

# 🔐 Security & Access Control

## 🛡️ **How System Protects Data:**

### 1. **Authentication Required**
- All users must **login with email & password**
- JWT tokens used for secure sessions
- Automatic logout after inactivity

### 2. **Role-Based Access**
- Each API endpoint checks user **role**
- Users can only access **their permitted features**
- Unauthorized access returns **403 Forbidden** error

### 3. **Data Isolation**
- Students can only see **their own data**
- Parents can only see **their children's data**
- Teachers can only see **their assigned classes**
- Each school's data is **completely separate** (multi-tenant)

### 4. **Sensitive Data Protection**
- Passwords are **encrypted** (bcrypt)
- Passwords never shown in API responses
- JWT tokens stored in **HTTP-only cookies**
- No direct database access from frontend

### 5. **Input Validation**
- All user inputs are **validated**
- SQL/NoSQL injection prevented
- XSS attacks prevented
- File upload restrictions enforced

---

# 🎯 Common Use Cases

## 📖 **Scenario 1: Daily School Operations**

**Morning - Attendance:**
1. Teachers login → Mark attendance for their classes
2. Students login → Check if marked present
3. Parents receive notification if child absent
4. Admin views school-wide attendance dashboard

**Afternoon - Assignments:**
1. Teacher creates new assignment → Sets due date
2. Students receive notification → View assignment
3. Students submit assignment online
4. Teacher grades submissions → Provides feedback
5. Students view grades and feedback

**Evening - Communication:**
1. Admin sends notification about tomorrow's event
2. All users (teachers, students, parents) receive notification
3. Parents register children for event

---

## 📖 **Scenario 2: Monthly Fee Collection**

1. **Admin** creates monthly fee structure
2. **Admin** assigns fees to all students
3. **Students/Parents** receive fee notification
4. **Parents** view fee details in dashboard
5. **Staff (Accounts)** collects payment → Records in system
6. **System** generates receipt automatically
7. **Parents** download receipt
8. **Admin** views fee collection report

---

## 📖 **Scenario 3: Exam Season**

1. **Admin** creates exam schedule
2. **Teachers** receive notification about exam dates
3. **Students** view exam timetable
4. **Parents** get notification about exams
5. After exams:
   - **Teachers** enter marks for their subjects
   - **Admin** publishes results
   - **Students** view their results
   - **Parents** receive result notification
   - **Admin** generates report cards

---

# 💡 Best Practices for Users

## 👨‍💼 **For Admins:**
- ✅ Regularly backup data
- ✅ Review user accounts monthly
- ✅ Monitor system usage
- ✅ Keep fee records updated
- ✅ Send timely notifications

## 👨‍🏫 **For Teachers:**
- ✅ Mark attendance daily
- ✅ Create assignments regularly
- ✅ Grade submissions on time
- ✅ Provide detailed feedback
- ✅ Keep result records accurate

## 👨‍🎓 **For Students:**
- ✅ Check timetable daily
- ✅ Submit assignments before deadline
- ✅ Review feedback from teachers
- ✅ Monitor attendance percentage
- ✅ Pay fees on time

## 👨‍👩‍👧 **For Parents:**
- ✅ Check children's progress weekly
- ✅ Monitor attendance regularly
- ✅ Review assignment submissions
- ✅ Pay fees on time
- ✅ Communicate with teachers

## 👷 **For Staff:**
- ✅ Keep records updated
- ✅ Process fees promptly
- ✅ Maintain library accurately
- ✅ Respond to queries quickly

---

# 🎊 Conclusion

This **School Management System** provides **complete role-based access** to ensure:
- ✅ **Security** - Each user sees only what they should
- ✅ **Privacy** - Personal data protected
- ✅ **Efficiency** - Everyone has tools they need
- ✅ **Transparency** - Parents stay informed
- ✅ **Accountability** - All actions tracked

**Every role is designed to make school management smooth, secure, and efficient!** 🎓🚀
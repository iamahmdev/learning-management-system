import { Routes, Route } from "react-router-dom";

// ==========================================
// AUTH IMPORTS
// ==========================================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// ==========================================
// LAYOUT IMPORTS
// ==========================================
import AdminLayout from "../layouts/AdminLayout";

// ==========================================
// ADMIN PANEL IMPORTS
// ==========================================
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import StudentManagement from "../pages/admin/StudentManagement";
import TeacherManagement from "../pages/admin/TeacherManagement";
import ParentManagement from "../pages/admin/ParentManagement";
import StaffManagement from "../pages/admin/StaffManagement";
import ClassManagement from "../pages/admin/ClassManagement";
import SectionManagement from "../pages/admin/SectionManagement";
import SubjectManagement from "../pages/admin/SubjectManagement";
import AcademicSessionManagement from "../pages/admin/AcademicSessionManagement";
import FeeManagement from "../pages/admin/FeeManagement";
import ResultManagement from "../pages/admin/ResultManagement";
import AttendanceManagement from "../pages/admin/AttendanceManagement";
import ExamManagement from "../pages/admin/ExamManagement";
import LibraryManagement from "../pages/admin/LibraryManagement";
import TransportManagement from "../pages/admin/TransportManagement";
import TimetableManagement from "../pages/admin/TimetableManagement";
import NoticeManagement from "../pages/admin/NoticeManagement";
import SchoolManagement from "../pages/admin/SchoolManagement";
import MyProfile from "../pages/admin/MyProfile";
import Settings from "../pages/admin/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================================== */}
      {/* DEFAULT & AUTHENTICATION ROUTES */}
      {/* ========================================== */}

      {/* Default Route - Redirects to Login */}
      <Route path="/" element={<Login />} />

      {/* User Login */}
      <Route path="/login" element={<Login />} />

      {/* New User Registration */}
      <Route path="/register" element={<Register />} />

      {/* Password Recovery Request */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Password Reset with Token */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ========================================== */}
      {/* ADMIN PANEL ROUTES (WITH LAYOUT) */}
      {/* ========================================== */}

      <Route path="/admin" element={<AdminLayout />}>
        {/* Admin Dashboard - Overview & Statistics */}
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* User Management - System Users & Roles */}
        <Route path="users" element={<UserManagement />} />

        {/* Student Management - Student Records & Enrollment */}
        <Route path="students" element={<StudentManagement />} />

        {/* Teacher Management - Teaching Staff & Qualifications */}
        <Route path="teachers" element={<TeacherManagement />} />

        {/* Parent Management - Parent/Guardian Accounts */}
        <Route path="parents" element={<ParentManagement />} />

        {/* Staff Management - Non-Teaching Staff & Departments */}
        <Route path="staff" element={<StaffManagement />} />

        {/* Class Management - Class Records & Organization */}
        <Route path="classes" element={<ClassManagement />} />

        {/* Section Management - Section Organization */}
        <Route path="sections" element={<SectionManagement />} />

        {/* Subject Management - Subject & Curriculum */}
        <Route path="subjects" element={<SubjectManagement />} />

        {/* Academic Session Management - Academic Years & Terms */}
        <Route
          path="academic-sessions"
          element={<AcademicSessionManagement />}
        />

        {/* Exam Management - Exam Scheduling & Organization */}
        <Route path="exams" element={<ExamManagement />} />

        {/* Result Management - Exam Results & Academic Performance */}
        <Route path="results" element={<ResultManagement />} />

        {/* Attendance Management - Daily Attendance Records */}
        <Route
          path="attendance"
          element={<AttendanceManagement />}
        />

        {/* Fee Management - Student Fees & Payment Tracking */}
        <Route path="fees" element={<FeeManagement />} />

        {/* Library Management - Library Books & Circulation */}
        <Route path="library" element={<LibraryManagement />} />

        {/* Transport Management - Transport Routes & Vehicles */}
        <Route path="transport" element={<TransportManagement />} />

        {/* Timetable Management - Class Schedules & Periods */}
        <Route path="timetable" element={<TimetableManagement />} />

        {/* Notice Management - School Announcements & Notices */}
        <Route path="notices" element={<NoticeManagement />} />

        {/* School Management - School Information & Settings */}
        <Route path="schools" element={<SchoolManagement />} />

        {/* My Profile - User Profile & Account Settings */}
        <Route path="profile" element={<MyProfile />} />

        {/* Settings - System Settings & Configuration */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

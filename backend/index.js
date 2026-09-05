import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import schoolRoutes from "./routes/school.routes.js";
import academicYearRoutes from "./routes/academicYear.routes.js";
import classRoutes from "./routes/class.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import parentStudentRelationshipRoutes from "./routes/parent-student-relationship.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import examRoutes from "./routes/exam.routes.js";
import resultRoutes from "./routes/result.routes.js";
import feeRoutes from "./routes/fee.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import transportRoutes from "./routes/transport.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import homeworkRoutes from "./routes/homework.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import communicationRoutes from "./routes/communication.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import eventRoutes from "./routes/event.routes.js";
import admissionRoutes from "./routes/admission.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import auditLogRoutes from "./routes/auditLog.routes.js";
import alumniRoutes from "./routes/alumni.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import scholarshipRoutes from "./routes/scholarship.routes.js";
import hostelRoutes from "./routes/hostel.routes.js";
import canteenRoutes from "./routes/canteen.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import idCardRoutes from "./routes/idCard.routes.js";
import visitorRoutes from "./routes/visitor.routes.js";
import onlineClassRoutes from "./routes/onlineClass.routes.js";
import questionBankRoutes from "./routes/questionBank.routes.js";
import disciplineRoutes from "./routes/discipline.routes.js";
import healthRecordRoutes from "./routes/healthRecord.routes.js";
import biometricAttendanceRoutes from "./routes/biometricAttendance.routes.js";
import vehicleTrackingRoutes from "./routes/vehicleTracking.routes.js";
import teacherPortalRoutes from "./routes/teacherPortal.routes.js";
import parentPortalRoutes from "./routes/parentPortal.routes.js";
import studentPortalRoutes from "./routes/studentPortal.routes.js";
import reportRoutes from "./routes/report.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import mobileAppRoutes from "./routes/mobileApp.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
      : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Database Connection
dbConnect()

// Auth Routes
app.use("/api/users", userRoutes);
// school Route
app.use("/api/schools", schoolRoutes);
// AcademicYear Route
app.use("/api/academic-years", academicYearRoutes);
// class route
app.use("/api/classes", classRoutes);
// section model
app.use("/api/sections", sectionRoutes);

// subject routes
app.use("/api/subjects", subjectRoutes);

// teacher route
app.use("/api/teachers", teacherRoutes);

// student route
app.use("/api/students", studentRoutes);

// parent Route
app.use("/api/parents", parentRoutes);

// parent Route Relationship
app.use(
  "/api/parent-student-relationships",
  parentStudentRelationshipRoutes
);

// Attendance Route
app.use("/api/attendance", attendanceRoutes);

// Exame Route
app.use("/api/exams", examRoutes);

// Result Route
app.use("/api/results", resultRoutes);

// fee Route
app.use("/api/fees", feeRoutes);

// payroll route
app.use("/api/payrolls", payrollRoutes);

// timetable route
app.use("/api/timetables", timetableRoutes);

// Transport Management Route
app.use("/api/transports", transportRoutes);

// Library Management Route
app.use("/api/library", libraryRoutes);

// Homework & Assignment Management Route
app.use("/api/homework", homeworkRoutes);

// Leave Management Route
app.use("/api/leaves", leaveRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/fee-payments", feePaymentRoutes);

// Staff Management Route
app.use("/api/staff", staffRoutes);

// Inventory Management Route
app.use("/api/inventory", inventoryRoutes);

// Communication Management Route
app.use("/api/communications", communicationRoutes);

// Notification Management Route
app.use("/api/notifications", notificationRoutes);

// Event Management Route
app.use("/api/events", eventRoutes);

// Admission Management Route
app.use("/api/admissions", admissionRoutes);

// Certificate Management Route
app.use("/api/certificates", certificateRoutes);

// Settings Management Route
app.use("/api/settings", settingRoutes);

// Audit Log Management Route
app.use("/api/audit-logs", auditLogRoutes);

// Alumni Management Route
app.use("/api/alumni", alumniRoutes);

// Complaint Management Route
app.use("/api/complaints", complaintRoutes);

// Feedback Management Route
app.use("/api/feedback", feedbackRoutes);

// Expense Management Route
app.use("/api/expenses", expenseRoutes);

// Budget Management Route
app.use("/api/budgets", budgetRoutes);

// Scholarship Management Route
app.use("/api/scholarships", scholarshipRoutes);

// Hostel Management Route
app.use("/api/hostels", hostelRoutes);

// Canteen Management Route
app.use("/api/canteen", canteenRoutes);

// Invoice Management Route
app.use("/api/invoices", invoiceRoutes);

// ID Card Management Route
app.use("/api/id-cards", idCardRoutes);

// Visitor Management Route
app.use("/api/visitors", visitorRoutes);

// Online Class Management Route
app.use("/api/online-classes", onlineClassRoutes);

// Question Bank Management Route
app.use("/api/question-bank", questionBankRoutes);

// Discipline Management Route
app.use("/api/discipline", disciplineRoutes);

// Health Record Management Route
app.use("/api/health-records", healthRecordRoutes);

// Biometric Attendance Route
app.use("/api/biometric-attendance", biometricAttendanceRoutes);

// Vehicle Tracking Route
app.use("/api/vehicle-tracking", vehicleTrackingRoutes);

// Teacher Portal Route
app.use("/api/teacher-portal", teacherPortalRoutes);

// Parent Portal Route
app.use("/api/parent-portal", parentPortalRoutes);

// Student Portal Route
app.use("/api/student-portal", studentPortalRoutes);

// Report Management Route
app.use("/api/reports", reportRoutes);

// Analytics Route
app.use("/api/analytics", analyticsRoutes);

// Webhook & Integration Route
app.use("/api/webhooks", webhookRoutes);

// Mobile App API Route
app.use("/api/mobile-app", mobileAppRoutes);

// Dashboard Route
app.use("/api/dashboards", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
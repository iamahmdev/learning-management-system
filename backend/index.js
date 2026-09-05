import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";

// ============================================
// 30 CORE MODULES IMPORTS
// ============================================
import userRoutes from "./routes/user.routes.js";
import schoolRoutes from "./routes/school.routes.js";
import studentRoutes from "./routes/student.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import classRoutes from "./routes/class.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import academicYearRoutes from "./routes/academicYear.routes.js";
import admissionRoutes from "./routes/admission.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import examRoutes from "./routes/exam.routes.js";
import resultRoutes from "./routes/result.routes.js";
import homeworkRoutes from "./routes/homework.routes.js";
import feeRoutes from "./routes/fee.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import transportRoutes from "./routes/transport.routes.js";
import communicationRoutes from "./routes/communication.routes.js";
import eventRoutes from "./routes/event.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import reportRoutes from "./routes/report.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import disciplineRoutes from "./routes/discipline.routes.js";
import parentPortalRoutes from "./routes/parentPortal.routes.js";
import studentPortalRoutes from "./routes/studentPortal.routes.js";

// Supporting modules
import parentStudentRelationshipRoutes from "./routes/parent-student-relationship.routes.js";
import subjectAssignmentRoutes from "./routes/subjectAssignment.routes.js";
import academicCalendarRoutes from "./routes/academicCalendar.routes.js";
import gradeSystemRoutes from "./routes/gradeSystem.routes.js";
import feeStructureRoutes from "./routes/feeStructure.routes.js";
import transportRouteRoutes from "./routes/transportRoute.routes.js";
import teacherPortalRoutes from "./routes/teacherPortal.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
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
dbConnect();

// ============================================
// 30 CORE MODULE ROUTES
// ============================================

// 1. Authentication & User Management
app.use("/api/users", userRoutes);

// 2. School Management
app.use("/api/schools", schoolRoutes);

// 3. Student Management
app.use("/api/students", studentRoutes);

// 4. Parent Management
app.use("/api/parents", parentRoutes);
app.use("/api/parent-student-relationships", parentStudentRelationshipRoutes);

// 5. Teacher Management
app.use("/api/teachers", teacherRoutes);

// 6. Staff Management
app.use("/api/staff", staffRoutes);

// 7. Class Management
app.use("/api/classes", classRoutes);

// 8. Section Management
app.use("/api/sections", sectionRoutes);

// 9. Subject Management
app.use("/api/subjects", subjectRoutes);
app.use("/api/subject-assignments", subjectAssignmentRoutes);

// 10. Academic Year Management
app.use("/api/academic-years", academicYearRoutes);
app.use("/api/academic-calendar", academicCalendarRoutes);

// 11. Admission Management
app.use("/api/admissions", admissionRoutes);

// 12. Attendance Management
app.use("/api/attendance", attendanceRoutes);

// 13. Timetable Management
app.use("/api/timetables", timetableRoutes);

// 14. Exam Management
app.use("/api/exams", examRoutes);

// 15. Result Management
app.use("/api/results", resultRoutes);
app.use("/api/grade-systems", gradeSystemRoutes);

// 16. Homework Management
app.use("/api/homework", homeworkRoutes);

// 17. Fee Management
app.use("/api/fees", feeRoutes);
app.use("/api/fee-structures", feeStructureRoutes);

// 18. Invoice Management
app.use("/api/invoices", invoiceRoutes);

// 19. Leave Management
app.use("/api/leaves", leaveRoutes);

// 20. Library Management
app.use("/api/library", libraryRoutes);

// 21. Transport Management
app.use("/api/transports", transportRoutes);
app.use("/api/transport-routes", transportRouteRoutes);

// 22. Communication Management
app.use("/api/communications", communicationRoutes);

// 23. Event Management
app.use("/api/events", eventRoutes);

// 24. Notification Management
app.use("/api/notifications", notificationRoutes);

// 25. Reports & Analytics
app.use("/api/reports", reportRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboards", dashboardRoutes);

// 26. Certificate Management
app.use("/api/certificates", certificateRoutes);

// 27. Inventory Management
app.use("/api/inventory", inventoryRoutes);

// 28. Discipline Management
app.use("/api/discipline", disciplineRoutes);

// 29. Parent Portal
app.use("/api/parent-portal", parentPortalRoutes);

// 30. Student & Teacher Portal
app.use("/api/student-portal", studentPortalRoutes);
app.use("/api/teacher-portal", teacherPortalRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
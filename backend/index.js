import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import schoolRoutes from "./routes/school.routes.js";
import studentRoutes from "./routes/student.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import classRoutes from "./routes/class.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import academicSessionRoutes from "./routes/academicSession.routes.js";
import examRoutes from "./routes/exam.routes.js";
import resultRoutes from "./routes/result.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";
import assignmentSubmissionRoutes from "./routes/assignmentSubmission.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import bookRoutes from "./routes/book.routes.js";
import bookIssueRoutes from "./routes/bookIssue.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import eventRoutes from "./routes/event.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import feeRoutes from "./routes/fee.routes.js";
import feePaymentRoutes from "./routes/feePayment.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// ----------------------------------------------------
// Middleware
// ----------------------------------------------------

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
      : true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------------------------------------
// API Routes
// ----------------------------------------------------

app.use("/api/users", userRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/academic-sessions", academicSessionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/assignment-submissions", assignmentSubmissionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/book-issues", bookIssueRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/fee-payments", feePaymentRoutes);

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "School Management System API is running",
  });
});

// ----------------------------------------------------
// 404 Handler
// ----------------------------------------------------

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ----------------------------------------------------
// Global Error Handler
// ----------------------------------------------------

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ----------------------------------------------------
// Server Configuration
// ----------------------------------------------------

const PORT = process.env.PORT || 5000;

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
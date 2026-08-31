import mongoose from "mongoose";
import User from "../models/user.model.js";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Parent from "../models/parent.model.js";
import Staff from "../models/staff.model.js";
import Class from "../models/class.model.js";
import Section from "../models/section.model.js";
import Subject from "../models/subject.model.js";
import Attendance from "../models/attendance.model.js";
import Assignment from "../models/assignment.model.js";
import AssignmentSubmission from "../models/assignmentSubmission.model.js";
import Exam from "../models/exam.model.js";
import Result from "../models/result.model.js";
import Fee from "../models/fee.model.js";
import FeePayment from "../models/feePayment.model.js";
import Event from "../models/event.model.js";
import Notification from "../models/notification.model.js";
import AcademicYear from "../models/academicYear.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// GET SCHOOL DASHBOARD STATISTICS
// =====================================================

export const getSchoolDashboard = async (req, res) => {
  try {
    const { schoolId } = req.query;

    if (!schoolId || !isValidObjectId(schoolId)) {
      return res.status(400).json({
        success: false,
        message: "Valid school ID is required",
      });
    }

    // Get current academic year
    const currentAcademicYear = await AcademicYear.findOne({
      schoolId,
      isCurrent: true,
    });

    const academicYearId = currentAcademicYear?._id;

    // Basic counts
    const [
      totalStudents,
      totalTeachers,
      totalParents,
      totalStaff,
      totalClasses,
      totalSections,
      totalSubjects,
    ] = await Promise.all([
      Student.countDocuments({ schoolId, status: "active" }),
      Teacher.countDocuments({ schoolId, status: "active" }),
      Parent.countDocuments({ schoolId, status: "active" }),
      Staff.countDocuments({ schoolId, status: "active" }),
      Class.countDocuments({ schoolId, status: "active" }),
      Section.countDocuments({ schoolId, status: "active" }),
      Subject.countDocuments({ schoolId, status: "active" }),
    ]);

    // Today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await Attendance.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId),
          date: { $gte: today, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const attendanceStats = {
      present: 0,
      absent: 0,
      late: 0,
      leave: 0,
      total: 0,
    };

    todayAttendance.forEach(stat => {
      if (attendanceStats.hasOwnProperty(stat._id)) {
        attendanceStats[stat._id] = stat.count;
        attendanceStats.total += stat.count;
      }
    });

    // Fee statistics
    const feeStats = await Fee.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId),
          ...(academicYearId && { academicYearId: academicYearId }),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
          paidAmount: { $sum: "$paidAmount" },
          remainingAmount: { $sum: "$remainingAmount" },
        },
      },
    ]);

    const feeStatistics = {
      pending: { count: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
      partial: { count: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
      paid: { count: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
      overdue: { count: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
      total: { count: 0, totalAmount: 0, paidAmount: 0, remainingAmount: 0 },
    };

    feeStats.forEach(stat => {
      if (feeStatistics.hasOwnProperty(stat._id)) {
        feeStatistics[stat._id] = {
          count: stat.count,
          totalAmount: stat.totalAmount,
          paidAmount: stat.paidAmount,
          remainingAmount: stat.remainingAmount,
        };
        feeStatistics.total.count += stat.count;
        feeStatistics.total.totalAmount += stat.totalAmount;
        feeStatistics.total.paidAmount += stat.paidAmount;
        feeStatistics.total.remainingAmount += stat.remainingAmount;
      }
    });

    // Assignment statistics
    const assignmentStats = await Assignment.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId),
          ...(academicYearId && { academicYearId: academicYearId }),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const assignmentStatistics = {
      draft: 0,
      published: 0,
      closed: 0,
      archived: 0,
      total: 0,
    };

    assignmentStats.forEach(stat => {
      if (assignmentStatistics.hasOwnProperty(stat._id)) {
        assignmentStatistics[stat._id] = stat.count;
        assignmentStatistics.total += stat.count;
      }
    });

    // Recent events
    const upcomingEvents = await Event.find({
      schoolId,
      eventDate: { $gte: today },
      status: "published",
    })
      .populate("organizer", "name")
      .sort({ eventDate: 1 })
      .limit(5);

    // Unread notifications count
    const unreadNotifications = await Notification.countDocuments({
      schoolId,
      isRead: false,
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      message: "School dashboard statistics retrieved successfully",
      data: {
        schoolInfo: {
          schoolId,
          currentAcademicYear: currentAcademicYear?.name || null,
        },
        basicCounts: {
          totalStudents,
          totalTeachers,
          totalParents,
          totalStaff,
          totalClasses,
          totalSections,
          totalSubjects,
        },
        attendanceStats,
        feeStatistics,
        assignmentStatistics,
        upcomingEvents,
        unreadNotifications,
      },
    });
  } catch (error) {
    console.error("Get School Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve school dashboard statistics",
    });
  }
};

// =====================================================
// GET STUDENT DASHBOARD
// =====================================================

export const getStudentDashboard = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid student ID is required",
      });
    }

    // Get student info
    const student = await Student.findById(studentId)
      .populate("schoolId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Recent attendance (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentAttendance = await Attendance.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
          date: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const attendanceStats = {
      present: 0,
      absent: 0,
      late: 0,
      leave: 0,
      total: 0,
    };

    recentAttendance.forEach(stat => {
      if (attendanceStats.hasOwnProperty(stat._id)) {
        attendanceStats[stat._id] = stat.count;
        attendanceStats.total += stat.count;
      }
    });

    // Assignment statistics
    const assignmentStats = await AssignmentSubmission.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          avgMarks: { $avg: "$marksObtained" },
        },
      },
    ]);

    const assignmentStatistics = {
      submitted: { count: 0, avgMarks: 0 },
      graded: { count: 0, avgMarks: 0 },
      returned: { count: 0, avgMarks: 0 },
      total: { count: 0, avgMarks: 0 },
    };

    assignmentStats.forEach(stat => {
      if (assignmentStatistics.hasOwnProperty(stat._id)) {
        assignmentStatistics[stat._id] = {
          count: stat.count,
          avgMarks: stat.avgMarks || 0,
        };
        assignmentStatistics.total.count += stat.count;
      }
    });

    // Fee summary
    const feeSummary = await Fee.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
          paidAmount: { $sum: "$paidAmount" },
          remainingAmount: { $sum: "$remainingAmount" },
        },
      },
    ]);

    const feeStatistics = feeSummary[0] || {
      totalAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
    };

    // Recent exam results
    const recentResults = await Result.find({
      studentId,
    })
      .populate("examId", "name")
      .populate("subjectId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Pending assignments
    const pendingAssignments = await Assignment.find({
      classId: student.classId,
      sectionId: student.sectionId,
      status: "published",
      dueDate: { $gte: new Date() },
    })
      .populate("subjectId", "name")
      .sort({ dueDate: 1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Student dashboard retrieved successfully",
      data: {
        studentInfo: {
          name: student.userId?.name,
          studentId: student._id,
          school: student.schoolId?.name,
          class: student.classId?.name,
          section: student.sectionId?.name,
        },
        attendanceStats,
        assignmentStatistics,
        feeStatistics,
        recentResults,
        pendingAssignments,
      },
    });
  } catch (error) {
    console.error("Get Student Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve student dashboard",
    });
  }
};

// =====================================================
// GET TEACHER DASHBOARD
// =====================================================

export const getTeacherDashboard = async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId || !isValidObjectId(teacherId)) {
      return res.status(400).json({
        success: false,
        message: "Valid teacher ID is required",
      });
    }

    // Get teacher info
    const teacher = await Teacher.findById(teacherId)
      .populate("schoolId", "name")
      .populate("userId", "name");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Assignment statistics
    const assignmentStats = await Assignment.aggregate([
      {
        $match: {
          teacherId: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const assignmentStatistics = {
      draft: 0,
      published: 0,
      closed: 0,
      total: 0,
    };

    assignmentStats.forEach(stat => {
      if (assignmentStatistics.hasOwnProperty(stat._id)) {
        assignmentStatistics[stat._id] = stat.count;
        assignmentStatistics.total += stat.count;
      }
    });

    // Pending submissions to grade
    const pendingSubmissions = await AssignmentSubmission.countDocuments({
      "assignmentId": {
        $in: await Assignment.find({ teacherId }, "_id"),
      },
      status: "submitted",
    });

    // Classes taught
    const classesCount = await Assignment.distinct("classId", { teacherId }).then(
      classes => classes.length
    );

    // Students taught
    const studentsCount = await Assignment.aggregate([
      {
        $match: {
          teacherId: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "classId",
          foreignField: "classId",
          as: "students",
        },
      },
      {
        $unwind: "$students",
      },
      {
        $group: {
          _id: "$students._id",
        },
      },
      {
        $count: "total",
      },
    ]);

    const totalStudentsTaught = studentsCount[0]?.total || 0;

    return res.status(200).json({
      success: true,
      message: "Teacher dashboard retrieved successfully",
      data: {
        teacherInfo: {
          name: teacher.userId?.name,
          teacherId: teacher._id,
          school: teacher.schoolId?.name,
        },
        assignmentStatistics,
        pendingSubmissions,
        classesCount,
        totalStudentsTaught,
      },
    });
  } catch (error) {
    console.error("Get Teacher Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve teacher dashboard",
    });
  }
};
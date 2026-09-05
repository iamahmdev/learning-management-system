import mongoose from "mongoose";

import Attendance from "../models/attendance.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";
import Section from "../models/section.model.js";
import Student from "../models/student.model.js";

// =====================================================
// CREATE ATTENDANCE
// =====================================================

export const createAttendance = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date,
      status,
      remarks,
    } = req.body;

    // Check School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check Academic Year
    const academicYear = await AcademicYear.findById(
      academicYearId
    );

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    // Academic Year must belong to School
    if (
      academicYear.schoolId.toString() !==
      schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Academic Year does not belong to this school",
      });
    }

    // Check Class
    const classRecord = await Class.findById(classId);

    if (!classRecord) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Class must belong to School
    if (
      classRecord.schoolId.toString() !==
      schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Class does not belong to this school",
      });
    }

    // Class must belong to Academic Year
    if (
      classRecord.academicYearId.toString() !==
      academicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to this academic year",
      });
    }

    // Check Section
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Section must belong to School
    if (
      section.schoolId.toString() !==
      schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this school",
      });
    }

    // Section must belong to Academic Year
    if (
      section.academicYearId.toString() !==
      academicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this academic year",
      });
    }

    // Section must belong to Class
    if (
      section.classId.toString() !==
      classId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this class",
      });
    }

    // Check Student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Student must belong to School
    if (
      student.schoolId.toString() !==
      schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this school",
      });
    }

    // Student must belong to Academic Year
    if (
      student.academicYearId.toString() !==
      academicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this academic year",
      });
    }

    // Student must belong to Class
    if (
      student.classId.toString() !==
      classId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this class",
      });
    }

    // Student must belong to Section
    if (
      student.sectionId.toString() !==
      sectionId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this section",
      });
    }

    // Normalize date to start of day
    const attendanceDate = new Date(date);

    attendanceDate.setHours(0, 0, 0, 0);

    // Check duplicate attendance
    const existingAttendance =
      await Attendance.findOne({
        studentId,
        date: attendanceDate,
      });

    if (existingAttendance) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance already exists for this student on this date",
      });
    }

    // Create attendance
    const attendance = await Attendance.create({
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date: attendanceDate,
      status,
      remarks,
    });

    // Populate related data
    await attendance.populate([
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "academicYearId",
        select:
          "name startDate endDate isCurrent status",
      },
      {
        path: "classId",
        select: "name code description status",
      },
      {
        path: "sectionId",
        select:
          "name code roomNumber capacity status",
      },
      {
        path: "studentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendance,
    });
  } catch (error) {
    console.error("Create Attendance Error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance already exists for this student on this date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ATTENDANCE
// =====================================================

export const getAllAttendance = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date,
      status,
    } = req.query;

    const filter = {};

    // Filter by School
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }

      filter.schoolId = schoolId;
    }

    // Filter by Academic Year
    if (academicYearId) {
      if (
        !mongoose.Types.ObjectId.isValid(academicYearId)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }

      filter.academicYearId = academicYearId;
    }

    // Filter by Class
    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }

      filter.classId = classId;
    }

    // Filter by Section
    if (sectionId) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Section ID",
        });
      }

      filter.sectionId = sectionId;
    }

    // Filter by Student
    if (studentId) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }

      filter.studentId = studentId;
    }

    // Filter by Date
    if (date) {
      const filterDate = new Date(date);

      if (Number.isNaN(filterDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid attendance date",
        });
      }

      filterDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(filterDate);
      nextDate.setDate(nextDate.getDate() + 1);

      filter.date = {
        $gte: filterDate,
        $lt: nextDate,
      };
    }

    // Filter by Status
    if (status) {
      const allowedStatuses = [
        "present",
        "absent",
        "late",
        "leave",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid attendance status",
        });
      }

      filter.status = status;
    }

    // Get attendance
    const attendance = await Attendance.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "academicYearId",
        select:
          "name startDate endDate isCurrent status",
      })
      .populate({
        path: "classId",
        select: "name code description status",
      })
      .populate({
        path: "sectionId",
        select:
          "name code roomNumber capacity status",
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      })
      .sort({
        date: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get All Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// GET ATTENDANCE BY ID
// =====================================================

export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attendance ID",
      });
    }

    // Find attendance
    const attendance = await Attendance.findById(id)
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "academicYearId",
        select:
          "name startDate endDate isCurrent status",
      })
      .populate({
        path: "classId",
        select: "name code description status",
      })
      .populate({
        path: "sectionId",
        select:
          "name code roomNumber capacity status",
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ATTENDANCE
// =====================================================

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Attendance ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attendance ID",
      });
    }

    // Find existing attendance
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date,
      status,
      remarks,
    } = req.body;

    // Final values
    const finalSchoolId =
      schoolId || attendance.schoolId;

    const finalAcademicYearId =
      academicYearId || attendance.academicYearId;

    const finalClassId =
      classId || attendance.classId;

    const finalSectionId =
      sectionId || attendance.sectionId;

    const finalStudentId =
      studentId || attendance.studentId;

    const finalDate = date
      ? new Date(date)
      : new Date(attendance.date);

    // Validate final IDs
    if (
      !mongoose.Types.ObjectId.isValid(
        finalSchoolId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid School ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        finalAcademicYearId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(finalClassId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        finalSectionId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Section ID",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        finalStudentId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    if (Number.isNaN(finalDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance date",
      });
    }

    // Normalize date
    finalDate.setHours(0, 0, 0, 0);

    // Check School
    const school = await School.findById(
      finalSchoolId
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check Academic Year
    const academicYear =
      await AcademicYear.findById(
        finalAcademicYearId
      );

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    if (
      academicYear.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Academic Year does not belong to this school",
      });
    }

    // Check Class
    const classRecord = await Class.findById(
      finalClassId
    );

    if (!classRecord) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    if (
      classRecord.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Class does not belong to this school",
      });
    }

    if (
      classRecord.academicYearId.toString() !==
      finalAcademicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to this academic year",
      });
    }

    // Check Section
    const section = await Section.findById(
      finalSectionId
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    if (
      section.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this school",
      });
    }

    if (
      section.academicYearId.toString() !==
      finalAcademicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this academic year",
      });
    }

    if (
      section.classId.toString() !==
      finalClassId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to this class",
      });
    }

    // Check Student
    const student = await Student.findById(
      finalStudentId
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (
      student.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this school",
      });
    }

    if (
      student.academicYearId.toString() !==
      finalAcademicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this academic year",
      });
    }

    if (
      student.classId.toString() !==
      finalClassId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this class",
      });
    }

    if (
      student.sectionId.toString() !==
      finalSectionId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Student does not belong to this section",
      });
    }

    // Check duplicate attendance
    const duplicate =
      await Attendance.findOne({
        studentId: finalStudentId,
        date: finalDate,
        _id: { $ne: id },
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance already exists for this student on this date",
      });
    }

    // Update fields
    attendance.schoolId = finalSchoolId;
    attendance.academicYearId =
      finalAcademicYearId;
    attendance.classId = finalClassId;
    attendance.sectionId = finalSectionId;
    attendance.studentId = finalStudentId;
    attendance.date = finalDate;

    if (status !== undefined) {
      attendance.status = status;
    }

    if (remarks !== undefined) {
      attendance.remarks = remarks;
    }

    // Save
    await attendance.save();

    // Populate updated attendance
    await attendance.populate([
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "academicYearId",
        select:
          "name startDate endDate isCurrent status",
      },
      {
        path: "classId",
        select: "name code description status",
      },
      {
        path: "sectionId",
        select:
          "name code roomNumber capacity status",
      },
      {
        path: "studentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    console.error(
      "Update Attendance Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance already exists for this student on this date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ATTENDANCE
// =====================================================

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attendance ID",
      });
    }

    // Find attendance
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    // Delete attendance
    await Attendance.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};
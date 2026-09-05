import mongoose from "mongoose";
import StudentPortal from "../models/studentPortal.model.js";
import Student from "../models/student.model.js";
import School from "../models/school.model.js";

// =====================================================
// CREATE STUDENT PORTAL
// =====================================================
export const createStudentPortal = async (req, res) => {
  try {
    const {
      studentId,
      schoolId,
      preferences,
      portalAccess,
      status,
    } = req.body;

    // Validate Student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Validate School
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check if portal already exists
    const existingPortal = await StudentPortal.findOne({ studentId });
    if (existingPortal) {
      return res.status(409).json({
        success: false,
        message: "Student portal already exists",
      });
    }

    // Create Student Portal
    const studentPortal = await StudentPortal.create({
      studentId,
      schoolId,
      preferences,
      portalAccess,
      status,
    });

    await studentPortal.populate([
      {
        path: "studentId",
        select: "userId admissionNumber rollNumber",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Student portal created successfully",
      studentPortal,
    });
  } catch (error) {
    console.error("Create Student Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create student portal",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL STUDENT PORTALS
// =====================================================
export const getAllStudentPortals = async (req, res) => {
  try {
    const { schoolId, status } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    if (status) {
      filter.status = status;
    }

    const studentPortals = await StudentPortal.find(filter)
      .populate({
        path: "studentId",
        select: "userId admissionNumber rollNumber",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Student portals fetched successfully",
      count: studentPortals.length,
      studentPortals,
    });
  } catch (error) {
    console.error("Get All Student Portals Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student portals",
      error: error.message,
    });
  }
};

// =====================================================
// GET STUDENT PORTAL BY ID
// =====================================================
export const getStudentPortalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student Portal ID",
      });
    }

    const studentPortal = await StudentPortal.findById(id)
      .populate({
        path: "studentId",
        select: "userId admissionNumber rollNumber",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      });

    if (!studentPortal) {
      return res.status(404).json({
        success: false,
        message: "Student portal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student portal fetched successfully",
      studentPortal,
    });
  } catch (error) {
    console.error("Get Student Portal By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student portal",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE STUDENT PORTAL
// =====================================================
export const updateStudentPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student Portal ID",
      });
    }

    const studentPortal = await StudentPortal.findById(id);
    if (!studentPortal) {
      return res.status(404).json({
        success: false,
        message: "Student portal not found",
      });
    }

    const {
      preferences,
      portalAccess,
      activityLog,
      status,
      lastLogin,
    } = req.body;

    if (preferences !== undefined) {
      studentPortal.preferences = {
        ...studentPortal.preferences,
        ...preferences,
      };
    }

    if (portalAccess !== undefined) {
      studentPortal.portalAccess = {
        ...studentPortal.portalAccess,
        ...portalAccess,
      };
    }

    if (activityLog !== undefined) {
      studentPortal.activityLog.push(...activityLog);
    }

    if (status !== undefined) {
      studentPortal.status = status;
    }

    if (lastLogin !== undefined) {
      studentPortal.lastLogin = lastLogin;
    }

    await studentPortal.save();

    await studentPortal.populate([
      {
        path: "studentId",
        select: "userId admissionNumber rollNumber",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Student portal updated successfully",
      studentPortal,
    });
  } catch (error) {
    console.error("Update Student Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update student portal",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE STUDENT PORTAL
// =====================================================
export const deleteStudentPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student Portal ID",
      });
    }

    const studentPortal = await StudentPortal.findById(id);
    if (!studentPortal) {
      return res.status(404).json({
        success: false,
        message: "Student portal not found",
      });
    }

    await StudentPortal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Student portal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete student portal",
      error: error.message,
    });
  }
};

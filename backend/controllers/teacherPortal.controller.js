import mongoose from "mongoose";
import TeacherPortal from "../models/teacherPortal.model.js";
import Teacher from "../models/teacher.model.js";
import School from "../models/school.model.js";

// =====================================================
// CREATE TEACHER PORTAL
// =====================================================
export const createTeacherPortal = async (req, res) => {
  try {
    const {
      teacherId,
      schoolId,
      preferences,
      portalAccess,
      assignedClasses,
      status,
    } = req.body;

    // Validate Teacher
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
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
    const existingPortal = await TeacherPortal.findOne({ teacherId });
    if (existingPortal) {
      return res.status(409).json({
        success: false,
        message: "Teacher portal already exists",
      });
    }

    // Create Teacher Portal
    const teacherPortal = await TeacherPortal.create({
      teacherId,
      schoolId,
      preferences,
      portalAccess,
      assignedClasses,
      status,
    });

    await teacherPortal.populate([
      {
        path: "teacherId",
        select: "userId employeeId department designation",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
      {
        path: "assignedClasses.classId",
        select: "name code",
      },
      {
        path: "assignedClasses.sectionId",
        select: "name code",
      },
      {
        path: "assignedClasses.subjectId",
        select: "name code",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Teacher portal created successfully",
      teacherPortal,
    });
  } catch (error) {
    console.error("Create Teacher Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create teacher portal",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL TEACHER PORTALS
// =====================================================
export const getAllTeacherPortals = async (req, res) => {
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

    const teacherPortals = await TeacherPortal.find(filter)
      .populate({
        path: "teacherId",
        select: "userId employeeId department designation",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      })
      .populate({
        path: "assignedClasses.classId",
        select: "name code",
      })
      .populate({
        path: "assignedClasses.sectionId",
        select: "name code",
      })
      .populate({
        path: "assignedClasses.subjectId",
        select: "name code",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Teacher portals fetched successfully",
      count: teacherPortals.length,
      teacherPortals,
    });
  } catch (error) {
    console.error("Get All Teacher Portals Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher portals",
      error: error.message,
    });
  }
};

// =====================================================
// GET TEACHER PORTAL BY ID
// =====================================================
export const getTeacherPortalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher Portal ID",
      });
    }

    const teacherPortal = await TeacherPortal.findById(id)
      .populate({
        path: "teacherId",
        select: "userId employeeId department designation",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      })
      .populate({
        path: "assignedClasses.classId",
        select: "name code",
      })
      .populate({
        path: "assignedClasses.sectionId",
        select: "name code",
      })
      .populate({
        path: "assignedClasses.subjectId",
        select: "name code",
      });

    if (!teacherPortal) {
      return res.status(404).json({
        success: false,
        message: "Teacher portal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Teacher portal fetched successfully",
      teacherPortal,
    });
  } catch (error) {
    console.error("Get Teacher Portal By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher portal",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE TEACHER PORTAL
// =====================================================
export const updateTeacherPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher Portal ID",
      });
    }

    const teacherPortal = await TeacherPortal.findById(id);
    if (!teacherPortal) {
      return res.status(404).json({
        success: false,
        message: "Teacher portal not found",
      });
    }

    const {
      preferences,
      portalAccess,
      assignedClasses,
      status,
      lastLogin,
    } = req.body;

    if (preferences !== undefined) {
      teacherPortal.preferences = {
        ...teacherPortal.preferences,
        ...preferences,
      };
    }

    if (portalAccess !== undefined) {
      teacherPortal.portalAccess = {
        ...teacherPortal.portalAccess,
        ...portalAccess,
      };
    }

    if (assignedClasses !== undefined) {
      teacherPortal.assignedClasses = assignedClasses;
    }

    if (status !== undefined) {
      teacherPortal.status = status;
    }

    if (lastLogin !== undefined) {
      teacherPortal.lastLogin = lastLogin;
    }

    await teacherPortal.save();

    await teacherPortal.populate([
      {
        path: "teacherId",
        select: "userId employeeId department designation",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
      {
        path: "assignedClasses.classId",
        select: "name code",
      },
      {
        path: "assignedClasses.sectionId",
        select: "name code",
      },
      {
        path: "assignedClasses.subjectId",
        select: "name code",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Teacher portal updated successfully",
      teacherPortal,
    });
  } catch (error) {
    console.error("Update Teacher Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update teacher portal",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE TEACHER PORTAL
// =====================================================
export const deleteTeacherPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher Portal ID",
      });
    }

    const teacherPortal = await TeacherPortal.findById(id);
    if (!teacherPortal) {
      return res.status(404).json({
        success: false,
        message: "Teacher portal not found",
      });
    }

    await TeacherPortal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Teacher portal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Teacher Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete teacher portal",
      error: error.message,
    });
  }
};

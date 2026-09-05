import mongoose from "mongoose";
import ParentPortal from "../models/parentPortal.model.js";
import Parent from "../models/parent.model.js";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";

// =====================================================
// CREATE PARENT PORTAL
// =====================================================
export const createParentPortal = async (req, res) => {
  try {
    const {
      parentId,
      schoolId,
      preferences,
      accessibleStudents,
      portalAccess,
      status,
    } = req.body;

    // Validate Parent
    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
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
    const existingPortal = await ParentPortal.findOne({ parentId });
    if (existingPortal) {
      return res.status(409).json({
        success: false,
        message: "Parent portal already exists",
      });
    }

    // Validate accessible students
    if (accessibleStudents && accessibleStudents.length > 0) {
      const students = await Student.find({
        _id: { $in: accessibleStudents },
      });
      if (students.length !== accessibleStudents.length) {
        return res.status(404).json({
          success: false,
          message: "One or more students not found",
        });
      }
    }

    // Create Parent Portal
    const parentPortal = await ParentPortal.create({
      parentId,
      schoolId,
      preferences,
      accessibleStudents,
      portalAccess,
      status,
    });

    await parentPortal.populate([
      {
        path: "parentId",
        select: "userId fatherName motherName phone email",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
      {
        path: "accessibleStudents",
        select: "userId admissionNumber rollNumber",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Parent portal created successfully",
      parentPortal,
    });
  } catch (error) {
    console.error("Create Parent Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create parent portal",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL PARENT PORTALS
// =====================================================
export const getAllParentPortals = async (req, res) => {
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

    const parentPortals = await ParentPortal.find(filter)
      .populate({
        path: "parentId",
        select: "userId fatherName motherName phone email",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      })
      .populate({
        path: "accessibleStudents",
        select: "userId admissionNumber rollNumber",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Parent portals fetched successfully",
      count: parentPortals.length,
      parentPortals,
    });
  } catch (error) {
    console.error("Get All Parent Portals Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parent portals",
      error: error.message,
    });
  }
};

// =====================================================
// GET PARENT PORTAL BY ID
// =====================================================
export const getParentPortalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent Portal ID",
      });
    }

    const parentPortal = await ParentPortal.findById(id)
      .populate({
        path: "parentId",
        select: "userId fatherName motherName phone email",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone",
      })
      .populate({
        path: "accessibleStudents",
        select: "userId admissionNumber rollNumber",
      });

    if (!parentPortal) {
      return res.status(404).json({
        success: false,
        message: "Parent portal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parent portal fetched successfully",
      parentPortal,
    });
  } catch (error) {
    console.error("Get Parent Portal By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parent portal",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PARENT PORTAL
// =====================================================
export const updateParentPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent Portal ID",
      });
    }

    const parentPortal = await ParentPortal.findById(id);
    if (!parentPortal) {
      return res.status(404).json({
        success: false,
        message: "Parent portal not found",
      });
    }

    const {
      preferences,
      accessibleStudents,
      portalAccess,
      status,
      lastLogin,
    } = req.body;

    if (preferences !== undefined) {
      parentPortal.preferences = {
        ...parentPortal.preferences,
        ...preferences,
      };
    }

    if (accessibleStudents !== undefined) {
      parentPortal.accessibleStudents = accessibleStudents;
    }

    if (portalAccess !== undefined) {
      parentPortal.portalAccess = {
        ...parentPortal.portalAccess,
        ...portalAccess,
      };
    }

    if (status !== undefined) {
      parentPortal.status = status;
    }

    if (lastLogin !== undefined) {
      parentPortal.lastLogin = lastLogin;
    }

    await parentPortal.save();

    await parentPortal.populate([
      {
        path: "parentId",
        select: "userId fatherName motherName phone email",
      },
      {
        path: "schoolId",
        select: "name code email phone",
      },
      {
        path: "accessibleStudents",
        select: "userId admissionNumber rollNumber",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Parent portal updated successfully",
      parentPortal,
    });
  } catch (error) {
    console.error("Update Parent Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update parent portal",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PARENT PORTAL
// =====================================================
export const deleteParentPortal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent Portal ID",
      });
    }

    const parentPortal = await ParentPortal.findById(id);
    if (!parentPortal) {
      return res.status(404).json({
        success: false,
        message: "Parent portal not found",
      });
    }

    await ParentPortal.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Parent portal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Parent Portal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete parent portal",
      error: error.message,
    });
  }
};

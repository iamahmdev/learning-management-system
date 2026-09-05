import mongoose from "mongoose";

import Parent from "../models/parent.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

// =====================================================
// CREATE PARENT
// =====================================================
export const createParent = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      relationship,
      occupation,
      alternatePhone,
      address,
      status,
    } = req.body;

    // Check User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User role must be parent
    if (user.role !== "parent") {
      return res.status(400).json({
        success: false,
        message: "User role must be parent",
      });
    }

    // Check School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check existing Parent profile
    const existingParent = await Parent.findOne({ userId });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "Parent profile already exists for this user",
      });
    }

    // Create Parent
    const parent = await Parent.create({
      userId,
      schoolId,
      relationship,
      occupation,
      alternatePhone,
      address,
      status,
    });

    // Populate relations
    await parent.populate([
      {
        path: "userId",
        select: "name email role phone profile status",
      },
      {
        path: "schoolId",
        select: "name code email phone status",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Parent created successfully",
      parent,
    });
  } catch (error) {
    console.error("Create Parent Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Parent profile already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create parent",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL PARENTS
// =====================================================
export const getAllParents = async (req, res) => {
  try {
    const { schoolId, relationship, status } = req.query;

    const filter = {};

    // School filter
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }

      filter.schoolId = schoolId;
    }

    // Relationship filter
    if (relationship) {
      const allowedRelationships = [
        "father",
        "mother",
        "guardian",
        "grandfather",
        "grandmother",
        "other",
      ];

      if (!allowedRelationships.includes(relationship)) {
        return res.status(400).json({
          success: false,
          message: "Invalid relationship",
        });
      }

      filter.relationship = relationship;
    }

    // Status filter
    if (status) {
      const allowedStatuses = ["active", "inactive"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent status",
        });
      }

      filter.status = status;
    }

    const parents = await Parent.find(filter)
      .populate({
        path: "userId",
        select: "name email role phone profile status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Parents fetched successfully",
      count: parents.length,
      parents,
    });
  } catch (error) {
    console.error("Get All Parents Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch parents",
      error: error.message,
    });
  }
};

// =====================================================
// GET PARENT BY ID
// =====================================================
export const getParentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent ID",
      });
    }

    const parent = await Parent.findById(id)
      .populate({
        path: "userId",
        select: "name email role phone profile status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      });

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parent fetched successfully",
      parent,
    });
  } catch (error) {
    console.error("Get Parent By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch parent",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PARENT
// =====================================================
export const updateParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent ID",
      });
    }

    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    const {
      userId,
      schoolId,
      relationship,
      occupation,
      alternatePhone,
      address,
      status,
    } = req.body;

    const finalUserId = userId || parent.userId;
    const finalSchoolId = schoolId || parent.schoolId;

    // Check User
    const user = await User.findById(finalUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "parent") {
      return res.status(400).json({
        success: false,
        message: "User role must be parent",
      });
    }

    // Prevent duplicate User relation
    const existingParent = await Parent.findOne({
      userId: finalUserId,
      _id: { $ne: id },
    });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "Another parent profile already uses this user",
      });
    }

    // Check School
    const school = await School.findById(finalSchoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Update fields
    parent.userId = finalUserId;
    parent.schoolId = finalSchoolId;

    if (relationship !== undefined) {
      parent.relationship = relationship;
    }

    if (occupation !== undefined) {
      parent.occupation = occupation;
    }

    if (alternatePhone !== undefined) {
      parent.alternatePhone = alternatePhone;
    }

    if (address !== undefined) {
      parent.address = address;
    }

    if (status !== undefined) {
      parent.status = status;
    }

    await parent.save();

    // Populate relations
    await parent.populate([
      {
        path: "userId",
        select: "name email role phone profile status",
      },
      {
        path: "schoolId",
        select: "name code email phone status",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Parent updated successfully",
      parent,
    });
  } catch (error) {
    console.error("Update Parent Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Parent profile already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update parent",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PARENT
// =====================================================
export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent ID",
      });
    }

    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    await Parent.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Parent deleted successfully",
    });
  } catch (error) {
    console.error("Delete Parent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete parent",
      error: error.message,
    });
  }
};
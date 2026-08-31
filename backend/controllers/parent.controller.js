import mongoose from "mongoose";
import Parent from "../models/parent.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Check MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE PARENT
// =====================================================

export const createParent = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      parentId,
      relationship,
      occupation,
      nationalId,
      alternatePhone,
      address,
      students,
      status,
    } = req.body;

    // -------------------------------------------------
    // CHECK USER EXISTS
    // -------------------------------------------------

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // -------------------------------------------------
    // CHECK USER ROLE
    // -------------------------------------------------

    if (user.role !== "parent") {
      return res.status(400).json({
        success: false,
        message: "User role must be parent",
      });
    }

    // -------------------------------------------------
    // CHECK SCHOOL EXISTS
    // -------------------------------------------------

    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // -------------------------------------------------
    // CHECK USER ALREADY HAS PARENT PROFILE
    // -------------------------------------------------

    const existingParent = await Parent.findOne({
      userId,
    });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "Parent profile already exists for this user",
      });
    }

    // -------------------------------------------------
    // CHECK PARENT ID DUPLICATE
    // -------------------------------------------------

    const existingParentId = await Parent.findOne({
      schoolId,
      parentId: parentId.trim().toUpperCase(),
    });

    if (existingParentId) {
      return res.status(409).json({
        success: false,
        message: "Parent ID already exists in this school",
      });
    }

    // -------------------------------------------------
    // CHECK STUDENTS
    // -------------------------------------------------

    if (students && students.length > 0) {
      const studentCount = await Student.countDocuments({
        _id: { $in: students },
      });

      if (studentCount !== students.length) {
        return res.status(404).json({
          success: false,
          message: "One or more students not found",
        });
      }

      // Make sure students belong to same school
      const schoolStudentCount = await Student.countDocuments({
        _id: { $in: students },
        schoolId,
      });

      if (schoolStudentCount !== students.length) {
        return res.status(400).json({
          success: false,
          message: "All students must belong to the same school",
        });
      }
    }

    // -------------------------------------------------
    // CREATE PARENT
    // -------------------------------------------------

    const parent = await Parent.create({
      userId,
      schoolId,
      parentId: parentId.trim().toUpperCase(),
      relationship,
      occupation,
      nationalId,
      alternatePhone,
      address,
      students,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Parent created successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Create Parent Error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Parent with the provided unique information already exists",
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
    const parents = await Parent.find()
      .populate({
        path: "userId",
        select: "name email phone role status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone city country",
      })
      .populate({
        path: "students",
        select: "admissionNumber rollNumber dateOfBirth gender status",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Parents fetched successfully",
      count: parents.length,
      data: parents,
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

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const parent = await Parent.findById(id)
      .populate({
        path: "userId",
        select: "name email phone role status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone city country",
      })
      .populate({
        path: "students",
        select:
          "admissionNumber rollNumber dateOfBirth gender status",
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
      data: parent,
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

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const existingParent = await Parent.findById(id);

    if (!existingParent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    const {
      userId,
      schoolId,
      parentId,
      relationship,
      occupation,
      nationalId,
      alternatePhone,
      address,
      students,
      status,
    } = req.body;

    // -------------------------------------------------
    // CHECK USER IF BEING UPDATED
    // -------------------------------------------------

    if (userId !== undefined) {
      const user = await User.findById(userId);

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

      const userAlreadyAssigned = await Parent.findOne({
        userId,
        _id: { $ne: id },
      });

      if (userAlreadyAssigned) {
        return res.status(409).json({
          success: false,
          message: "This user already has a parent profile",
        });
      }
    }

    // -------------------------------------------------
    // DETERMINE FINAL SCHOOL
    // -------------------------------------------------

    const finalSchoolId =
      schoolId !== undefined
        ? schoolId
        : existingParent.schoolId;

    // -------------------------------------------------
    // CHECK SCHOOL IF BEING UPDATED
    // -------------------------------------------------

    if (schoolId !== undefined) {
      const school = await School.findById(schoolId);

      if (!school) {
        return res.status(404).json({
          success: false,
          message: "School not found",
        });
      }
    }

    // -------------------------------------------------
    // CHECK PARENT ID DUPLICATE
    // -------------------------------------------------

    if (parentId !== undefined) {
      const normalizedParentId = parentId
        .trim()
        .toUpperCase();

      const duplicateParent = await Parent.findOne({
        schoolId: finalSchoolId,
        parentId: normalizedParentId,
        _id: { $ne: id },
      });

      if (duplicateParent) {
        return res.status(409).json({
          success: false,
          message: "Parent ID already exists in this school",
        });
      }
    }

    // -------------------------------------------------
    // CHECK STUDENTS
    // -------------------------------------------------

    if (students !== undefined && students.length > 0) {
      const studentCount = await Student.countDocuments({
        _id: { $in: students },
      });

      if (studentCount !== students.length) {
        return res.status(404).json({
          success: false,
          message: "One or more students not found",
        });
      }

      const schoolStudentCount =
        await Student.countDocuments({
          _id: { $in: students },
          schoolId: finalSchoolId,
        });

      if (schoolStudentCount !== students.length) {
        return res.status(400).json({
          success: false,
          message: "All students must belong to the same school",
        });
      }
    }

    // -------------------------------------------------
    // BUILD UPDATE DATA
    // -------------------------------------------------

    const updateData = {};

    if (userId !== undefined) {
      updateData.userId = userId;
    }

    if (schoolId !== undefined) {
      updateData.schoolId = schoolId;
    }

    if (parentId !== undefined) {
      updateData.parentId = parentId
        .trim()
        .toUpperCase();
    }

    if (relationship !== undefined) {
      updateData.relationship = relationship;
    }

    if (occupation !== undefined) {
      updateData.occupation = occupation;
    }

    if (nationalId !== undefined) {
      updateData.nationalId = nationalId;
    }

    if (alternatePhone !== undefined) {
      updateData.alternatePhone = alternatePhone;
    }

    if (address !== undefined) {
      updateData.address = address;
    }

    if (students !== undefined) {
      updateData.students = students;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    // -------------------------------------------------
    // UPDATE PARENT
    // -------------------------------------------------

    const parent = await Parent.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "userId",
        select: "name email phone role status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone city country",
      })
      .populate({
        path: "students",
        select:
          "admissionNumber rollNumber dateOfBirth gender status",
      });

    return res.status(200).json({
      success: true,
      message: "Parent updated successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Update Parent Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Parent with the provided unique information already exists",
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

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
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
      data: parent,
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
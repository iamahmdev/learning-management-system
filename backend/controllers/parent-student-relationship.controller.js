import mongoose from "mongoose";

import ParentStudentRelationship from "../models/parent-student-relationship.model.js";
import Parent from "../models/parent.model.js";
import Student from "../models/student.model.js";

// =====================================================
// CREATE PARENT-STUDENT RELATIONSHIP
// =====================================================

export const createParentStudentRelationship = async (req, res) => {
  try {
    const {
      parentId,
      studentId,
      relationship,
      isPrimary,
      status,
    } = req.body;

    // Check Parent
    const parent = await Parent.findById(parentId);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
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

    // Parent and Student must belong to same school
    if (
      parent.schoolId.toString() !==
      student.schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Parent and student must belong to the same school",
      });
    }

    // Check duplicate relationship
    const existingRelationship =
      await ParentStudentRelationship.findOne({
        parentId,
        studentId,
      });

    if (existingRelationship) {
      return res.status(409).json({
        success: false,
        message:
          "Parent-student relationship already exists",
      });
    }

    // If this is primary guardian,
    // remove primary status from other parents
    if (isPrimary === true) {
      await ParentStudentRelationship.updateMany(
        {
          studentId,
          isPrimary: true,
        },
        {
          $set: {
            isPrimary: false,
          },
        }
      );
    }

    // Create relationship
    const relationshipRecord =
      await ParentStudentRelationship.create({
        parentId,
        studentId,
        relationship,
        isPrimary,
        status,
      });

    // Populate Parent + Student details
    await relationshipRecord.populate([
      {
        path: "parentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      },
      {
        path: "studentId",
        populate: [
          {
            path: "userId",
            select:
              "name email role phone profile status",
          },
          {
            path: "schoolId",
            select:
              "name code email phone status",
          },
          {
            path: "academicYearId",
            select:
              "name startDate endDate isCurrent status",
          },
          {
            path: "classId",
            select:
              "name code description status",
          },
          {
            path: "sectionId",
            select:
              "name code roomNumber capacity status",
          },
        ],
      },
    ]);

    return res.status(201).json({
      success: true,
      message:
        "Parent-student relationship created successfully",
      relationship: relationshipRecord,
    });
  } catch (error) {
    console.error(
      "Create Parent Student Relationship Error:",
      error
    );

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Parent-student relationship already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create parent-student relationship",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL RELATIONSHIPS
// =====================================================

export const getAllParentStudentRelationships = async (
  req,
  res
) => {
  try {
    const {
      parentId,
      studentId,
      relationship,
      isPrimary,
      status,
    } = req.query;

    const filter = {};

    // Filter by Parent ID
    if (parentId) {
      if (!mongoose.Types.ObjectId.isValid(parentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Parent ID",
        });
      }

      filter.parentId = parentId;
    }

    // Filter by Student ID
    if (studentId) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }

      filter.studentId = studentId;
    }

    // Filter by Relationship
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

    // Filter by Primary
    if (isPrimary !== undefined) {
      if (
        isPrimary !== "true" &&
        isPrimary !== "false"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "isPrimary must be true or false",
        });
      }

      filter.isPrimary = isPrimary === "true";
    }

    // Filter by Status
    if (status) {
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    // Get relationships
    const relationships =
      await ParentStudentRelationship.find(filter)
        .populate({
          path: "parentId",
          populate: {
            path: "userId",
            select:
              "name email role phone profile status",
          },
        })
        .populate({
          path: "studentId",
          populate: [
            {
              path: "userId",
              select:
                "name email role phone profile status",
            },
            {
              path: "schoolId",
              select:
                "name code email phone status",
            },
            {
              path: "academicYearId",
              select:
                "name startDate endDate isCurrent status",
            },
            {
              path: "classId",
              select:
                "name code description status",
            },
            {
              path: "sectionId",
              select:
                "name code roomNumber capacity status",
            },
          ],
        })
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        "Parent-student relationships fetched successfully",
      count: relationships.length,
      relationships,
    });
  } catch (error) {
    console.error(
      "Get All Parent Student Relationships Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch parent-student relationships",
      error: error.message,
    });
  }
};

// =====================================================
// GET RELATIONSHIP BY ID
// =====================================================

export const getParentStudentRelationshipById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Relationship ID",
      });
    }

    // Find relationship
    const relationshipRecord =
      await ParentStudentRelationship.findById(id)
        .populate({
          path: "parentId",
          populate: {
            path: "userId",
            select:
              "name email role phone profile status",
          },
        })
        .populate({
          path: "studentId",
          populate: [
            {
              path: "userId",
              select:
                "name email role phone profile status",
            },
            {
              path: "schoolId",
              select:
                "name code email phone status",
            },
            {
              path: "academicYearId",
              select:
                "name startDate endDate isCurrent status",
            },
            {
              path: "classId",
              select:
                "name code description status",
            },
            {
              path: "sectionId",
              select:
                "name code roomNumber capacity status",
            },
          ],
        });

    if (!relationshipRecord) {
      return res.status(404).json({
        success: false,
        message:
          "Parent-student relationship not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Parent-student relationship fetched successfully",
      relationship: relationshipRecord,
    });
  } catch (error) {
    console.error(
      "Get Parent Student Relationship By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch parent-student relationship",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE RELATIONSHIP
// =====================================================

export const updateParentStudentRelationship = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // Validate Relationship ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Relationship ID",
      });
    }

    // Find relationship
    const relationshipRecord =
      await ParentStudentRelationship.findById(id);

    if (!relationshipRecord) {
      return res.status(404).json({
        success: false,
        message:
          "Parent-student relationship not found",
      });
    }

    const {
      parentId,
      studentId,
      relationship,
      isPrimary,
      status,
    } = req.body;

    // Final Parent ID
    const finalParentId =
      parentId || relationshipRecord.parentId;

    // Final Student ID
    const finalStudentId =
      studentId || relationshipRecord.studentId;

    // Validate Parent
    if (
      !mongoose.Types.ObjectId.isValid(finalParentId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Parent ID",
      });
    }

    // Validate Student
    if (
      !mongoose.Types.ObjectId.isValid(finalStudentId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    // Check Parent
    const parent = await Parent.findById(finalParentId);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
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

    // Parent and Student must belong to same school
    if (
      parent.schoolId.toString() !==
      student.schoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Parent and student must belong to the same school",
      });
    }

    // Check duplicate relationship
    const duplicate =
      await ParentStudentRelationship.findOne({
        parentId: finalParentId,
        studentId: finalStudentId,
        _id: { $ne: id },
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Another relationship already exists between this parent and student",
      });
    }

    // If primary, remove primary from other parents
    if (isPrimary === true) {
      await ParentStudentRelationship.updateMany(
        {
          studentId: finalStudentId,
          _id: { $ne: id },
          isPrimary: true,
        },
        {
          $set: {
            isPrimary: false,
          },
        }
      );
    }

    // Update fields
    relationshipRecord.parentId = finalParentId;
    relationshipRecord.studentId = finalStudentId;

    if (relationship !== undefined) {
      relationshipRecord.relationship =
        relationship;
    }

    if (isPrimary !== undefined) {
      relationshipRecord.isPrimary = isPrimary;
    }

    if (status !== undefined) {
      relationshipRecord.status = status;
    }

    // Save
    await relationshipRecord.save();

    // Populate updated relationship
    await relationshipRecord.populate([
      {
        path: "parentId",
        populate: {
          path: "userId",
          select:
            "name email role phone profile status",
        },
      },
      {
        path: "studentId",
        populate: [
          {
            path: "userId",
            select:
              "name email role phone profile status",
          },
          {
            path: "schoolId",
            select:
              "name code email phone status",
          },
          {
            path: "academicYearId",
            select:
              "name startDate endDate isCurrent status",
          },
          {
            path: "classId",
            select:
              "name code description status",
          },
          {
            path: "sectionId",
            select:
              "name code roomNumber capacity status",
          },
        ],
      },
    ]);

    return res.status(200).json({
      success: true,
      message:
        "Parent-student relationship updated successfully",
      relationship: relationshipRecord,
    });
  } catch (error) {
    console.error(
      "Update Parent Student Relationship Error:",
      error
    );

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Parent-student relationship already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update parent-student relationship",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE RELATIONSHIP
// =====================================================

export const deleteParentStudentRelationship = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Relationship ID",
      });
    }

    // Find relationship
    const relationshipRecord =
      await ParentStudentRelationship.findById(id);

    if (!relationshipRecord) {
      return res.status(404).json({
        success: false,
        message:
          "Parent-student relationship not found",
      });
    }

    // Delete relationship
    await ParentStudentRelationship.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Parent-student relationship deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Parent Student Relationship Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete parent-student relationship",
      error: error.message,
    });
  }
};
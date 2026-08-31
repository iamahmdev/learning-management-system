import mongoose from "mongoose";
import Assignment from "../models/assignment.model.js";
import AssignmentSubmission from "../models/assignmentSubmission.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE ASSIGNMENT
// =====================================================

export const createAssignment = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      teacherId,
      classId,
      sectionId,
      subjectId,
      title,
      description,
      instructions,
      assignedDate,
      dueDate,
      maxMarks,
      attachmentUrl,
      isActive,
      submissionType,
      allowLateSubmission,
      lateSubmissionPenalty,
      status,
      remarks,
    } = req.body;

    // Create assignment
    const assignment = new Assignment({
      schoolId,
      academicYearId,
      teacherId,
      classId,
      sectionId,
      subjectId,
      title,
      description,
      instructions,
      assignedDate,
      dueDate,
      maxMarks,
      attachmentUrl,
      isActive,
      submissionType,
      allowLateSubmission,
      lateSubmissionPenalty,
      status,
      remarks,
    });

    await assignment.save();

    // Populate references
    await assignment.populate([
      { path: "schoolId", select: "name" },
      { path: "academicYearId", select: "name" },
      { path: "teacherId", populate: { path: "userId", select: "name" } },
      { path: "classId", select: "name" },
      { path: "sectionId", select: "name" },
      { path: "subjectId", select: "name code" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create assignment",
    });
  }
};

// =====================================================
// GET ALL ASSIGNMENTS
// =====================================================

export const getAllAssignments = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      teacherId,
      classId,
      sectionId,
      subjectId,
      status,
      isActive,
      page = 1,
      limit = 20,
    } = req.query;

    // Build filter
    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (academicYearId && isValidObjectId(academicYearId)) {
      filter.academicYearId = academicYearId;
    }

    if (teacherId && isValidObjectId(teacherId)) {
      filter.teacherId = teacherId;
    }

    if (classId && isValidObjectId(classId)) {
      filter.classId = classId;
    }

    if (sectionId && isValidObjectId(sectionId)) {
      filter.sectionId = sectionId;
    }

    if (subjectId && isValidObjectId(subjectId)) {
      filter.subjectId = subjectId;
    }

    if (status) {
      filter.status = status;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get assignments
    const assignments = await Assignment.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "academicYearId", select: "name" },
        { path: "teacherId", populate: { path: "userId", select: "name" } },
        { path: "classId", select: "name" },
        { path: "sectionId", select: "name" },
        { path: "subjectId", select: "name code" },
      ])
      .sort({ assignedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalCount = await Assignment.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Assignments retrieved successfully",
      count: assignments.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: assignments,
    });
  } catch (error) {
    console.error("Get All Assignments Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignments",
    });
  }
};

// =====================================================
// GET ASSIGNMENT BY ID
// =====================================================

export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID format",
      });
    }

    // Find assignment
    const assignment = await Assignment.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "academicYearId", select: "name" },
        { path: "teacherId", populate: { path: "userId", select: "name" } },
        { path: "classId", select: "name" },
        { path: "sectionId", select: "name" },
        { path: "subjectId", select: "name code" },
      ]);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment retrieved successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Get Assignment By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignment",
    });
  }
};

// =====================================================
// UPDATE ASSIGNMENT
// =====================================================

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID format",
      });
    }

    // Find and update assignment
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "academicYearId", select: "name" },
      { path: "teacherId", populate: { path: "userId", select: "name" } },
      { path: "classId", select: "name" },
      { path: "sectionId", select: "name" },
      { path: "subjectId", select: "name code" },
    ]);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Update Assignment Error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update assignment",
    });
  }
};

// =====================================================
// DELETE ASSIGNMENT
// =====================================================

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID format",
      });
    }

    // Check if assignment has submissions
    const submissionCount = await AssignmentSubmission.countDocuments({
      assignmentId: id,
    });

    if (submissionCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete assignment with existing submissions. Archive it instead.",
      });
    }

    // Find and delete assignment
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error("Delete Assignment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
    });
  }
};

// =====================================================
// GET ASSIGNMENT STATISTICS
// =====================================================

export const getAssignmentStatistics = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID format",
      });
    }

    // Check if assignment exists
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Get submission statistics
    const stats = await AssignmentSubmission.aggregate([
      { $match: { assignmentId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          avgMarks: { 
            $avg: { 
              $cond: [
                { $ne: ["$marksObtained", null] }, 
                "$marksObtained", 
                0
              ] 
            }
          },
        }
      }
    ]);

    // Get total submission count
    const totalSubmissions = await AssignmentSubmission.countDocuments({
      assignmentId: id,
    });

    // Get late submission count
    const lateSubmissions = await AssignmentSubmission.countDocuments({
      assignmentId: id,
      isLateSubmission: true,
    });

    return res.status(200).json({
      success: true,
      message: "Assignment statistics retrieved successfully",
      data: {
        assignment: {
          id: assignment._id,
          title: assignment.title,
          dueDate: assignment.dueDate,
          maxMarks: assignment.maxMarks,
        },
        totalSubmissions,
        lateSubmissions,
        submissionsByStatus: stats,
      },
    });
  } catch (error) {
    console.error("Get Assignment Statistics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignment statistics",
    });
  }
};
import mongoose from "mongoose";
import AssignmentSubmission from "../models/assignmentSubmission.model.js";
import Assignment from "../models/assignment.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// SUBMIT ASSIGNMENT
// =====================================================

export const submitAssignment = async (req, res) => {
  try {
    const {
      assignmentId,
      studentId,
      schoolId,
      submissionText,
      attachmentUrl,
      remarks,
    } = req.body;

    // Get assignment details
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if assignment is active and published
    if (assignment.status !== "published" || !assignment.isActive) {
      return res.status(400).json({
        success: false,
        message: "Assignment is not available for submission",
      });
    }

    // Check if submission is late
    const now = new Date();
    const isLateSubmission = now > assignment.dueDate;

    // Check if late submission is allowed
    if (isLateSubmission && !assignment.allowLateSubmission) {
      return res.status(400).json({
        success: false,
        message: "Late submissions are not allowed for this assignment",
      });
    }

    // Check for existing submission
    const existingSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      studentId,
    }).sort({ submissionVersion: -1 });

    let submissionVersion = 1;
    if (existingSubmission) {
      submissionVersion = existingSubmission.submissionVersion + 1;
    }

    // Create submission
    const submission = new AssignmentSubmission({
      assignmentId,
      studentId,
      schoolId,
      submissionText,
      attachmentUrl,
      isLateSubmission,
      submissionVersion,
      remarks,
    });

    await submission.save();

    // Populate references
    await submission.populate([
      { 
        path: "assignmentId", 
        select: "title dueDate maxMarks",
        populate: { path: "subjectId", select: "name code" }
      },
      { path: "studentId", populate: { path: "userId", select: "name" } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      data: submission,
    });
  } catch (error) {
    console.error("Submit Assignment Error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Assignment submission already exists for this version",
      });
    }

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
      message: "Failed to submit assignment",
    });
  }
};

// =====================================================
// GET ALL SUBMISSIONS
// =====================================================

export const getAllSubmissions = async (req, res) => {
  try {
    const {
      assignmentId,
      studentId,
      schoolId,
      status,
      isLateSubmission,
      page = 1,
      limit = 20,
    } = req.query;

    // Build filter
    const filter = {};

    if (assignmentId && isValidObjectId(assignmentId)) {
      filter.assignmentId = assignmentId;
    }

    if (studentId && isValidObjectId(studentId)) {
      filter.studentId = studentId;
    }

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (status) {
      filter.status = status;
    }

    if (isLateSubmission !== undefined) {
      filter.isLateSubmission = isLateSubmission === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get submissions
    const submissions = await AssignmentSubmission.find(filter)
      .populate([
        { 
          path: "assignmentId", 
          select: "title dueDate maxMarks",
          populate: { path: "subjectId", select: "name code" }
        },
        { path: "studentId", populate: { path: "userId", select: "name" } },
        { path: "gradedBy", select: "name" },
      ])
      .sort({ submissionDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalCount = await AssignmentSubmission.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Assignment submissions retrieved successfully",
      count: submissions.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: submissions,
    });
  } catch (error) {
    console.error("Get All Submissions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignment submissions",
    });
  }
};

// =====================================================
// GET SUBMISSION BY ID
// =====================================================

export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format",
      });
    }

    // Find submission
    const submission = await AssignmentSubmission.findById(id)
      .populate([
        { 
          path: "assignmentId", 
          select: "title description dueDate maxMarks",
          populate: { path: "subjectId", select: "name code" }
        },
        { path: "studentId", populate: { path: "userId", select: "name" } },
        { path: "gradedBy", select: "name" },
      ]);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Assignment submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment submission retrieved successfully",
      data: submission,
    });
  } catch (error) {
    console.error("Get Submission By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignment submission",
    });
  }
};

// =====================================================
// GRADE ASSIGNMENT SUBMISSION
// =====================================================

export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      marksObtained,
      feedback,
      gradedBy,
      status,
      remarks,
    } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format",
      });
    }

    // Find submission
    const submission = await AssignmentSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Assignment submission not found",
      });
    }

    // Get assignment to validate marks
    const assignment = await Assignment.findById(submission.assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Validate marks obtained
    if (marksObtained !== null && marksObtained !== undefined) {
      if (marksObtained < 0 || marksObtained > assignment.maxMarks) {
        return res.status(400).json({
          success: false,
          message: `Marks obtained must be between 0 and ${assignment.maxMarks}`,
        });
      }
    }

    // Update submission
    const updatedSubmission = await AssignmentSubmission.findByIdAndUpdate(
      id,
      {
        marksObtained,
        feedback,
        gradedBy,
        gradedDate: new Date(),
        status: status || "graded",
        remarks,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { 
        path: "assignmentId", 
        select: "title maxMarks",
        populate: { path: "subjectId", select: "name code" }
      },
      { path: "studentId", populate: { path: "userId", select: "name" } },
      { path: "gradedBy", select: "name" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Assignment submission graded successfully",
      data: updatedSubmission,
    });
  } catch (error) {
    console.error("Grade Submission Error:", error);

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
      message: "Failed to grade assignment submission",
    });
  }
};

// =====================================================
// UPDATE SUBMISSION
// =====================================================

export const updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format",
      });
    }

    // Remove fields that shouldn't be updated directly
    delete updateData.assignmentId;
    delete updateData.studentId;
    delete updateData.schoolId;
    delete updateData.submissionVersion;

    // Find and update submission
    const submission = await AssignmentSubmission.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { 
        path: "assignmentId", 
        select: "title maxMarks",
        populate: { path: "subjectId", select: "name code" }
      },
      { path: "studentId", populate: { path: "userId", select: "name" } },
      { path: "gradedBy", select: "name" },
    ]);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Assignment submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment submission updated successfully",
      data: submission,
    });
  } catch (error) {
    console.error("Update Submission Error:", error);

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
      message: "Failed to update assignment submission",
    });
  }
};

// =====================================================
// DELETE SUBMISSION
// =====================================================

export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format",
      });
    }

    // Find submission
    const submission = await AssignmentSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Assignment submission not found",
      });
    }

    // Check if submission is already graded
    if (submission.status === "graded") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete graded assignment submission",
      });
    }

    // Delete submission
    await AssignmentSubmission.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Assignment submission deleted successfully",
    });
  } catch (error) {
    console.error("Delete Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment submission",
    });
  }
};
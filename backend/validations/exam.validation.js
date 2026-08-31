import mongoose from "mongoose";

// Allowed Exam Types
const allowedExamTypes = [
  "monthly",
  "mid_term",
  "final",
  "annual",
  "quiz",
  "test",
  "practical",
  "other",
];

// Allowed Exam Statuses
const allowedStatuses = [
  "draft",
  "scheduled",
  "ongoing",
  "completed",
  "cancelled",
];

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Validate Create Exam
export const validateCreateExam = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      type,
      startDate,
      endDate,
      totalMarks,
      passingMarks,
      description,
      status,
    } = req.body;

    // School ID
    if (!schoolId) {
      return res.status(400).json({
        success: false,
        message: "School ID is required",
      });
    }

    if (!isValidObjectId(schoolId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid School ID",
      });
    }

    // Academic Year ID
    if (!academicYearId) {
      return res.status(400).json({
        success: false,
        message: "Academic Year ID is required",
      });
    }

    if (!isValidObjectId(academicYearId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    // Class ID
    if (!classId) {
      return res.status(400).json({
        success: false,
        message: "Class ID is required",
      });
    }

    if (!isValidObjectId(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    // Exam Name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Exam name is required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Exam name must be at least 2 characters",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Exam name cannot exceed 100 characters",
      });
    }

    // Exam Type
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Exam type is required",
      });
    }

    if (!allowedExamTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid exam type. Allowed values are monthly, mid_term, final, annual, quiz, test, practical, other",
      });
    }

    // Start Date
    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: "Exam start date is required",
      });
    }

    const parsedStartDate = new Date(startDate);

    if (Number.isNaN(parsedStartDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam start date",
      });
    }

    // End Date
    if (!endDate) {
      return res.status(400).json({
        success: false,
        message: "Exam end date is required",
      });
    }

    const parsedEndDate = new Date(endDate);

    if (Number.isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam end date",
      });
    }

    // Date Relationship
    // Same-day exams are allowed.
    if (parsedStartDate > parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be after end date",
      });
    }

    // Total Marks
    if (totalMarks === undefined || totalMarks === null) {
      return res.status(400).json({
        success: false,
        message: "Total marks are required",
      });
    }

    if (
      typeof totalMarks !== "number" ||
      !Number.isFinite(totalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Total marks must be a valid number",
      });
    }

    if (totalMarks < 1) {
      return res.status(400).json({
        success: false,
        message: "Total marks must be greater than 0",
      });
    }

    // Passing Marks
    if (
      passingMarks === undefined ||
      passingMarks === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Passing marks are required",
      });
    }

    if (
      typeof passingMarks !== "number" ||
      !Number.isFinite(passingMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Passing marks must be a valid number",
      });
    }

    if (passingMarks < 0) {
      return res.status(400).json({
        success: false,
        message: "Passing marks cannot be negative",
      });
    }

    // Passing Marks cannot exceed Total Marks
    if (passingMarks > totalMarks) {
      return res.status(400).json({
        success: false,
        message:
          "Passing marks cannot be greater than total marks",
      });
    }

    // Description
    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Description cannot exceed 500 characters",
        });
      }
    }

    // Status
    // createdBy is NOT validated here because the controller
    // automatically sets it from req.user._id.
    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values are draft, scheduled, ongoing, completed, cancelled",
      });
    }

    next();
  } catch (error) {
    console.error("Create Exam Validation Error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid exam data",
      error: error.message,
    });
  }
};

// Validate Update Exam
export const validateUpdateExam = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      type,
      startDate,
      endDate,
      totalMarks,
      passingMarks,
      description,
      createdBy,
      status,
    } = req.body;

    // School ID
    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
    }

    // Academic Year ID
    if (academicYearId !== undefined) {
      if (!isValidObjectId(academicYearId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }
    }

    // Class ID
    if (classId !== undefined) {
      if (!isValidObjectId(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }
    }

    // Exam Name
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Exam name cannot be empty",
        });
      }

      if (name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Exam name must be at least 2 characters",
        });
      }

      if (name.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message:
            "Exam name cannot exceed 100 characters",
        });
      }
    }

    // Exam Type
    if (type !== undefined) {
      if (!allowedExamTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid exam type. Allowed values are monthly, mid_term, final, annual, quiz, test, practical, other",
        });
      }
    }

    // Start Date
    if (startDate !== undefined) {
      const parsedStartDate = new Date(startDate);

      if (Number.isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid exam start date",
        });
      }
    }

    // End Date
    if (endDate !== undefined) {
      const parsedEndDate = new Date(endDate);

      if (Number.isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid exam end date",
        });
      }
    }

    // Validate dates when both are provided
    if (
      startDate !== undefined &&
      endDate !== undefined
    ) {
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (parsedStartDate > parsedEndDate) {
        return res.status(400).json({
          success: false,
          message:
            "Start date cannot be after end date",
        });
      }
    }

    // Total Marks
    if (totalMarks !== undefined) {
      if (
        typeof totalMarks !== "number" ||
        !Number.isFinite(totalMarks)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Total marks must be a valid number",
        });
      }

      if (totalMarks < 1) {
        return res.status(400).json({
          success: false,
          message:
            "Total marks must be greater than 0",
        });
      }
    }

    // Passing Marks
    if (passingMarks !== undefined) {
      if (
        typeof passingMarks !== "number" ||
        !Number.isFinite(passingMarks)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Passing marks must be a valid number",
        });
      }

      if (passingMarks < 0) {
        return res.status(400).json({
          success: false,
          message:
            "Passing marks cannot be negative",
        });
      }
    }

    // Validate marks when both are provided
    if (
      totalMarks !== undefined &&
      passingMarks !== undefined
    ) {
      if (passingMarks > totalMarks) {
        return res.status(400).json({
          success: false,
          message:
            "Passing marks cannot be greater than total marks",
        });
      }
    }

    // Description
    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Description cannot exceed 500 characters",
        });
      }
    }

    // createdBy must not be changed by the client.
    // Controller will remove it from updateData.
    if (createdBy !== undefined) {
      return res.status(400).json({
        success: false,
        message: "createdBy cannot be updated",
      });
    }

    // Status
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values are draft, scheduled, ongoing, completed, cancelled",
        });
      }
    }

    next();
  } catch (error) {
    console.error("Update Exam Validation Error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid exam data",
      error: error.message,
    });
  }
};
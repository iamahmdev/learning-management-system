import Result from "../models/result.model.js";

import {
  createResultValidation,
  updateResultValidation,
} from "../validations/result.validation.js";

// Create Result
export const createResult = async (req, res) => {
  try {
    const { error, value } = createResultValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const result = await Result.create({
      ...value,
      createdBy:
        req.user?._id ||
        req.user?.id ||
        value.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A result already exists for this student, exam and subject",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create result",
      error: error.message,
    });
  }
};

// Get All Results
export const getAllResults = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) {
      filter.schoolId = req.query.schoolId;
    }

    if (req.query.academicYearId) {
      filter.academicYearId = req.query.academicYearId;
    }

    if (req.query.examId) {
      filter.examId = req.query.examId;
    }

    if (req.query.studentId) {
      filter.studentId = req.query.studentId;
    }

    if (req.query.subjectId) {
      filter.subjectId = req.query.subjectId;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const results = await Result.find(filter)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("examId", "name code examType")
      .populate("studentId")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch results",
      error: error.message,
    });
  }
};

// Get Result By ID
export const getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("examId", "name code examType")
      .populate("studentId")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch result",
      error: error.message,
    });
  }
};

// Update Result
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateResultValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const existingResult = await Result.findById(id);

    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    // Update fields manually to trigger pre("validate") hook
    Object.keys(value).forEach((key) => {
      existingResult[key] = value[key];
    });

    existingResult.updatedBy =
      req.user?._id ||
      req.user?.id ||
      value.updatedBy;

    // Save to trigger pre("validate") hook for percentage recalculation
    await existingResult.save();

    // Populate after save
    await existingResult.populate([
      { path: "schoolId", select: "name" },
      { path: "academicYearId", select: "name" },
      { path: "examId", select: "name code examType" },
      { path: "studentId" },
      { path: "subjectId", select: "name code" },
      { path: "createdBy", select: "name email" },
      { path: "updatedBy", select: "name email" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Result updated successfully",
      data: existingResult,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A result already exists for this student, exam and subject",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update result",
      error: error.message,
    });
  }
};

// Delete Result
export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete result",
      error: error.message,
    });
  }
};
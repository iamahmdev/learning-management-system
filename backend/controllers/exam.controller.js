import Exam from "../models/exam.model.js";
import {
  createExamValidation,
  updateExamValidation,
} from "../validations/exam.validation.js";

// Create Exam
export const createExam = async (req, res) => {
  try {
    // First, add createdBy from authenticated user before validation
    const dataToValidate = {
      ...req.body,
      createdBy: req.user?._id || req.body.createdBy,
    };

    const { error, value } = createExamValidation.validate(dataToValidate, {
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

    const exam = await Exam.create(value);

    return res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An exam with this code already exists for this school and academic year",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

// Get All Exams
export const getAllExams = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) {
      filter.schoolId = req.query.schoolId;
    }

    if (req.query.academicYearId) {
      filter.academicYearId = req.query.academicYearId;
    }

    if (req.query.examType) {
      filter.examType = req.query.examType;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const exams = await Exam.find(filter)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ startDate: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
};

// Get Exam By ID
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam",
      error: error.message,
    });
  }
};

// Update Exam
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateExamValidation.validate(req.body, {
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

    if (value.startDate && value.endDate) {
      if (new Date(value.endDate) < new Date(value.startDate)) {
        return res.status(400).json({
          success: false,
          message: "End date cannot be earlier than start date",
        });
      }
    }

    const existingExam = await Exam.findById(id);

    if (!existingExam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const updateData = {
      ...value,
      updatedBy: req.user?._id || value.updatedBy,
    };

    const exam = await Exam.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      data: exam,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An exam with this code already exists for this school and academic year",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update exam",
      error: error.message,
    });
  }
};

// Delete Exam
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};
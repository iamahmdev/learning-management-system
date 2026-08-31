import mongoose from "mongoose";
import Exam from "../models/exam.model.js";

// Create Exam
export const createExam = async (req, res) => {
  try {
    const examData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const exam = await Exam.create(examData);

    const populatedExam = await Exam.findById(exam._id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("createdBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: populatedExam,
    });
  } catch (error) {
    console.error("Create Exam Error:", error);

    // Duplicate exam
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "An exam with the same name already exists for this school, academic year, and class",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Exam validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
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
    const exams = await Exam.find()
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Exams fetched successfully",
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    console.error("Get All Exams Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

    const exam = await Exam.findById(id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("createdBy", "name email");

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
  } catch (error) {
    console.error("Get Exam By ID Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

    const updateData = {
      ...req.body,
    };

    // createdBy must never be changed by the client
    delete updateData.createdBy;

    const exam = await Exam.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("createdBy", "name email");

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      data: exam,
    });
  } catch (error) {
    console.error("Update Exam Error:", error);

    // Duplicate exam
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "An exam with the same name already exists for this school, academic year, and class",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Exam validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID",
      });
    }

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
      data: exam,
    });
  } catch (error) {
    console.error("Delete Exam Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};
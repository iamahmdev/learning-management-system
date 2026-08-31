import mongoose from "mongoose";
import Result from "../models/result.model.js";

// Create Result
export const createResult = async (req, res) => {
  try {
    const resultData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const result = await Result.create(resultData);

    const populatedResult = await Result.findById(result._id)
      .populate("studentId", "name")
      .populate("examId", "name type")
      .populate("subjectId", "name code")
      .populate("schoolId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("academicSessionId", "name")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: populatedResult,
    });
  } catch (error) {
    console.error("Create Result Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Result already exists for this student, exam and subject",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid result data",
        error: error.message,
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
    const results = await Result.find()
      .populate("studentId", "name")
      .populate("examId", "name type")
      .populate("subjectId", "name code")
      .populate("schoolId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("academicSessionId", "name")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Results fetched successfully",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Get All Results Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID",
      });
    }

    const result = await Result.findById(id)
      .populate("studentId", "name")
      .populate("examId", "name type")
      .populate("subjectId", "name code")
      .populate("schoolId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("academicSessionId", "name")
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
      message: "Result fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Get Result By ID Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID",
      });
    }

    const updateData = {
      ...req.body,
      updatedBy: req.user._id,
    };

    // createdBy should never be changed
    delete updateData.createdBy;

    const result = await Result.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("studentId", "name")
      .populate("examId", "name type")
      .populate("subjectId", "name code")
      .populate("schoolId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("academicSessionId", "name")
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
      message: "Result updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update Result Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Result already exists for this student, exam and subject",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid result data",
        error: error.message,
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID",
      });
    }

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
      data: result,
    });
  } catch (error) {
    console.error("Delete Result Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete result",
      error: error.message,
    });
  }
};
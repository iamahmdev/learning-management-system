import mongoose from "mongoose";
import Class from "../models/class.model.js";

// =====================================================
// CREATE CLASS
// =====================================================

export const createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);

    const populatedClass = await Class.findById(newClass._id)
      .populate("schoolId", "name")
      .populate(
        "academicYearId",
        "name startDate endDate"
      );

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: populatedClass,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A class with the same name or code already exists for this school and academic year",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Class validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create class",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL CLASSES
// =====================================================

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("schoolId", "name")
      .populate(
        "academicYearId",
        "name startDate endDate"
      )
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully",
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch classes",
      error: error.message,
    });
  }
};

// =====================================================
// GET CLASS BY ID
// =====================================================

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id)
      .populate("schoolId", "name")
      .populate(
        "academicYearId",
        "name startDate endDate"
      );

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: classData,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch class",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE CLASS
// =====================================================

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name")
      .populate(
        "academicYearId",
        "name startDate endDate"
      );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A class with the same name or code already exists for this school and academic year",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Class validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update class",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE CLASS
// =====================================================

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass =
      await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        message: "Invalid class ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete class",
      error: error.message,
    });
  }
};
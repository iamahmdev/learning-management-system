import mongoose from "mongoose";
import Section from "../models/section.model.js";

// Create Section
export const createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (error) {
    // Duplicate section name/code
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {});

      return res.status(409).json({
        success: false,
        message: `Section with the same ${duplicateField.includes("name") ? "name" : "code"} already exists for this class and academic year`,
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Section validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create section",
      error: error.message,
    });
  }
};

// Get All Sections
export const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Sections fetched successfully",
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sections",
      error: error.message,
    });
  }
};

// Get Section By ID
export const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID",
      });
    }

    const section = await Section.findById(id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name code");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section fetched successfully",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch section",
      error: error.message,
    });
  }
};

// Update Section
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID",
      });
    }

    const section = await Section.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name code");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    // Duplicate section name/code
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {});

      return res.status(409).json({
        success: false,
        message: `Section with the same ${duplicateField.includes("name") ? "name" : "code"} already exists for this class and academic year`,
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Section validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update section",
      error: error.message,
    });
  }
};

// Delete Section
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid section ID",
      });
    }

    const section = await Section.findByIdAndDelete(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete section",
      error: error.message,
    });
  }
};
import mongoose from "mongoose";
import School from "../models/school.model.js";

// =====================================================
// CREATE SCHOOL
// =====================================================

export const createSchool = async (req, res) => {
  try {
    const {
      name,
      code,
      email,
      phone,
      address,
      website,
      logo,
      principal,
      status,
    } = req.body;

    const existingSchool = await School.findOne({
      $or: [
        { email: email.toLowerCase() },
        { code: code.toUpperCase() },
      ],
    });

    if (existingSchool) {
      return res.status(409).json({
        success: false,
        message: "School with this email or code already exists",
      });
    }

    const school = await School.create({
      name,
      code,
      email,
      phone,
      address,
      website,
      logo,
      principal,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "School created successfully",
      school,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "School email or code already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "School validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create school",
      error: error.message,
    });
  }
};


// =====================================================
// GET ALL SCHOOLS
// =====================================================

export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find()
      .populate("principal", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      count: schools.length,
      schools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch schools",
      error: error.message,
    });
  }
};


// =====================================================
// GET SCHOOL BY ID
// =====================================================

export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid school ID",
      });
    }

    const school = await School.findById(id).populate(
      "principal",
      "name email role"
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School fetched successfully",
      school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch school",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE SCHOOL
// =====================================================

export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid school ID",
      });
    }

    const school = await School.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("principal", "name email role");

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      school,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "School email or code already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update school",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE SCHOOL
// =====================================================

export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid school ID",
      });
    }

    const school = await School.findByIdAndDelete(id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete school",
      error: error.message,
    });
  }
};
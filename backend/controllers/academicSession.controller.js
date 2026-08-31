import mongoose from "mongoose";
import AcademicYear from "../models/academicYear.model.js";

// Create Academic Year
export const createAcademicSession = async (req, res) => {
  try {
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "School access is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid school ID",
      });
    }

    const academicSession = await AcademicYear.create({
      ...req.body,
      schoolId,
    });

    // Only one current academic year per school
    if (academicSession.isCurrent) {
      await AcademicYear.updateMany(
        {
          schoolId,
          _id: { $ne: academicSession._id },
        },
        {
          $set: {
            isCurrent: false,
          },
        }
      );
    }

    return res.status(201).json({
      success: true,
      message: "Academic session created successfully",
      data: academicSession,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Academic year with this name already exists in this school",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Academic year validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create academic session",
      error: error.message,
    });
  }
};

// Get All Academic Years
export const getAllAcademicSessions = async (req, res) => {
  try {
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "School access is required",
      });
    }

    const academicSessions = await AcademicYear.find({
      schoolId,
    }).sort({ startDate: -1 });

    return res.status(200).json({
      success: true,
      message: "Academic sessions fetched successfully",
      count: academicSessions.length,
      data: academicSessions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch academic sessions",
      error: error.message,
    });
  }
};

// Get Academic Year By ID
export const getAcademicSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "School access is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid academic year ID",
      });
    }

    const academicSession = await AcademicYear.findOne({
      _id: id,
      schoolId,
    });

    if (!academicSession) {
      return res.status(404).json({
        success: false,
        message: "Academic session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Academic session fetched successfully",
      data: academicSession,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch academic session",
      error: error.message,
    });
  }
};

// Update Academic Year
export const updateAcademicSession = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "School access is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid academic year ID",
      });
    }

    // Prevent changing school ownership
    const { schoolId: ignoredSchoolId, ...updateData } = req.body;

    const academicSession =
      await AcademicYear.findOneAndUpdate(
        {
          _id: id,
          schoolId,
        },
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!academicSession) {
      return res.status(404).json({
        success: false,
        message: "Academic session not found",
      });
    }

    // Only one current academic year per school
    if (academicSession.isCurrent) {
      await AcademicYear.updateMany(
        {
          schoolId,
          _id: { $ne: academicSession._id },
        },
        {
          $set: {
            isCurrent: false,
          },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Academic session updated successfully",
      data: academicSession,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Academic year with this name already exists in this school",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Academic year validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update academic session",
      error: error.message,
    });
  }
};

// Delete Academic Year
export const deleteAcademicSession = async (req, res) => {
  try {
    const { id } = req.params;
    const schoolId = req.user?.schoolId;

    if (!schoolId) {
      return res.status(403).json({
        success: false,
        message: "School access is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid academic year ID",
      });
    }

    const academicSession =
      await AcademicYear.findOneAndDelete({
        _id: id,
        schoolId,
      });

    if (!academicSession) {
      return res.status(404).json({
        success: false,
        message: "Academic session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Academic session deleted successfully",
      data: academicSession,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete academic session",
      error: error.message,
    });
  }
};
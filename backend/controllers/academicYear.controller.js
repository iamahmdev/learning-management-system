import mongoose from "mongoose";
import AcademicYear from "../models/academicYear.model.js";
import School from "../models/school.model.js";

// =====================================================
// CREATE ACADEMIC YEAR
// =====================================================

export const createAcademicYear = async (req, res) => {
  try {
    const {
      schoolId,
      name,
      startDate,
      endDate,
      isCurrent,
      status,
    } = req.body;

    // Check school exists
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Prevent duplicate academic year
    const existingAcademicYear = await AcademicYear.findOne({
      schoolId,
      name: name.trim(),
    });

    if (existingAcademicYear) {
      return res.status(409).json({
        success: false,
        message: "Academic year already exists for this school",
      });
    }

    // If this is current year, remove current flag from others
    if (isCurrent === true) {
      await AcademicYear.updateMany(
        { schoolId },
        { $set: { isCurrent: false } }
      );
    }

    const academicYear = await AcademicYear.create({
      schoolId,
      name: name.trim(),
      startDate,
      endDate,
      isCurrent: isCurrent ?? false,
      status: status ?? "active",
    });

    return res.status(201).json({
      success: true,
      message: "Academic year created successfully",
      academicYear,
    });
  } catch (error) {
    console.error("Create Academic Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create academic year",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ACADEMIC YEARS
// =====================================================

export const getAllAcademicYears = async (req, res) => {
  try {
    const { schoolId, status, isCurrent } = req.query;

    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }

      filter.schoolId = schoolId;
    }

    if (status) {
      filter.status = status;
    }

    if (isCurrent !== undefined) {
      filter.isCurrent = isCurrent === "true";
    }

    const academicYears = await AcademicYear.find(filter)
      .populate("schoolId", "name code")
      .sort({ startDate: -1 });

    return res.status(200).json({
      success: true,
      message: "Academic years fetched successfully",
      count: academicYears.length,
      academicYears,
    });
  } catch (error) {
    console.error("Get All Academic Years Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch academic years",
      error: error.message,
    });
  }
};

// =====================================================
// GET ACADEMIC YEAR BY ID
// =====================================================

export const getAcademicYearById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    const academicYear = await AcademicYear.findById(id)
      .populate("schoolId", "name code");

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Academic year fetched successfully",
      academicYear,
    });
  } catch (error) {
    console.error("Get Academic Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch academic year",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ACADEMIC YEAR
// =====================================================

export const updateAcademicYear = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    const academicYear = await AcademicYear.findById(id);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    const {
      schoolId,
      name,
      startDate,
      endDate,
      isCurrent,
      status,
    } = req.body;

    // Check new school exists
    if (schoolId && schoolId.toString() !== academicYear.schoolId.toString()) {
      const school = await School.findById(schoolId);

      if (!school) {
        return res.status(404).json({
          success: false,
          message: "School not found",
        });
      }
    }

    const finalSchoolId = schoolId || academicYear.schoolId;
    const finalName = name ? name.trim() : academicYear.name;

    // Prevent duplicate name
    if (
      finalName !== academicYear.name ||
      finalSchoolId.toString() !== academicYear.schoolId.toString()
    ) {
      const duplicate = await AcademicYear.findOne({
        _id: { $ne: id },
        schoolId: finalSchoolId,
        name: finalName,
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Academic year already exists for this school",
        });
      }
    }

    // If setting this as current
    if (isCurrent === true) {
      await AcademicYear.updateMany(
        {
          schoolId: finalSchoolId,
          _id: { $ne: id },
        },
        {
          $set: { isCurrent: false },
        }
      );
    }

    // Update only provided fields
    if (schoolId !== undefined) academicYear.schoolId = schoolId;
    if (name !== undefined) academicYear.name = name.trim();
    if (startDate !== undefined) academicYear.startDate = startDate;
    if (endDate !== undefined) academicYear.endDate = endDate;
    if (isCurrent !== undefined) academicYear.isCurrent = isCurrent;
    if (status !== undefined) academicYear.status = status;

    await academicYear.save();

    return res.status(200).json({
      success: true,
      message: "Academic year updated successfully",
      academicYear,
    });
  } catch (error) {
    console.error("Update Academic Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update academic year",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ACADEMIC YEAR
// =====================================================

export const deleteAcademicYear = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    const academicYear = await AcademicYear.findById(id);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    await AcademicYear.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Academic year deleted successfully",
    });
  } catch (error) {
    console.error("Delete Academic Year Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete academic year",
      error: error.message,
    });
  }
};
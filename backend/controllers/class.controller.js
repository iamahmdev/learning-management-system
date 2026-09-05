import mongoose from "mongoose";
import Class from "../models/class.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";

// =====================================================
// CREATE CLASS
// =====================================================

export const createClass = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      name,
      code,
      description,
      status,
    } = req.body;

    // Check school
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check academic year
    const academicYear = await AcademicYear.findById(academicYearId);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    // Make sure academic year belongs to school
    if (academicYear.schoolId.toString() !== schoolId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Academic year does not belong to this school",
      });
    }

    // Prevent duplicate class
    const existingClass = await Class.findOne({
      schoolId,
      academicYearId,
      code: code.toUpperCase(),
    });

    if (existingClass) {
      return res.status(409).json({
        success: false,
        message: "Class with this code already exists for this academic year",
      });
    }

    const newClass = await Class.create({
      schoolId,
      academicYearId,
      name: name.trim(),
      code: code.toUpperCase(),
      description,
      status: status ?? "active",
    });

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    console.error("Create Class Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Class with this code already exists",
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
    const {
      schoolId,
      academicYearId,
      status,
    } = req.query;

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

    if (academicYearId) {
      if (!mongoose.Types.ObjectId.isValid(academicYearId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }

      filter.academicYearId = academicYearId;
    }

    if (status) {
      filter.status = status;
    }

    const classes = await Class.find(filter)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Classes fetched successfully",
      count: classes.length,
      classes,
    });
  } catch (error) {
    console.error("Get All Classes Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    const classData = await Class.findById(id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
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
      class: classData,
    });
  } catch (error) {
    console.error("Get Class Error:", error);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    const classData = await Class.findById(id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const {
      schoolId,
      academicYearId,
      name,
      code,
      description,
      status,
    } = req.body;

    const finalSchoolId = schoolId || classData.schoolId;
    const finalAcademicYearId =
      academicYearId || classData.academicYearId;
    const finalCode = code
      ? code.toUpperCase()
      : classData.code;

    // Check school if changed
    if (
      schoolId &&
      schoolId.toString() !== classData.schoolId.toString()
    ) {
      const school = await School.findById(schoolId);

      if (!school) {
        return res.status(404).json({
          success: false,
          message: "School not found",
        });
      }
    }

    // Check academic year if changed
    if (
      academicYearId &&
      academicYearId.toString() !==
        classData.academicYearId.toString()
    ) {
      const academicYear = await AcademicYear.findById(
        academicYearId
      );

      if (!academicYear) {
        return res.status(404).json({
          success: false,
          message: "Academic year not found",
        });
      }
    }

    // Check final academic year
    const finalAcademicYear = await AcademicYear.findById(
      finalAcademicYearId
    );

    if (!finalAcademicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    // Make sure academic year belongs to final school
    if (
      finalAcademicYear.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Academic year does not belong to this school",
      });
    }

    // Prevent duplicate class code
    const duplicateClass = await Class.findOne({
      _id: { $ne: id },
      schoolId: finalSchoolId,
      academicYearId: finalAcademicYearId,
      code: finalCode,
    });

    if (duplicateClass) {
      return res.status(409).json({
        success: false,
        message: "Class with this code already exists",
      });
    }

    // Update only provided fields
    if (schoolId !== undefined) {
      classData.schoolId = schoolId;
    }

    if (academicYearId !== undefined) {
      classData.academicYearId = academicYearId;
    }

    if (name !== undefined) {
      classData.name = name.trim();
    }

    if (code !== undefined) {
      classData.code = code.toUpperCase();
    }

    if (description !== undefined) {
      classData.description = description;
    }

    if (status !== undefined) {
      classData.status = status;
    }

    await classData.save();

    const updatedClass = await Class.findById(classData._id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      );

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Update Class Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Class with this code already exists",
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    const classData = await Class.findById(id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    await Class.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error("Delete Class Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete class",
      error: error.message,
    });
  }
};
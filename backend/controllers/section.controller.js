import mongoose from "mongoose";
import Section from "../models/section.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";

// Create Section
export const createSection = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      roomNumber,
      capacity,
      status,
    } = req.body;

    // Check School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check Academic Year
    const academicYear = await AcademicYear.findById(academicYearId);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    // Academic Year must belong to School
    if (academicYear.schoolId.toString() !== schoolId) {
      return res.status(400).json({
        success: false,
        message: "Academic Year does not belong to this school",
      });
    }

    // Check Class
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Class must belong to selected School and Academic Year
    if (
      classData.schoolId.toString() !== schoolId ||
      classData.academicYearId.toString() !== academicYearId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to the selected school and academic year",
      });
    }

    // Check duplicate Section
    const existingSection = await Section.findOne({
      schoolId,
      academicYearId,
      classId,
      code: code.toUpperCase(),
    });

    if (existingSection) {
      return res.status(409).json({
        success: false,
        message: "Section with this code already exists for this class",
      });
    }

    // Create Section
    const section = await Section.create({
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      roomNumber,
      capacity,
      status,
    });

    // Populate Section
    const populatedSection = await Section.findById(section._id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code");

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      section: populatedSection,
    });
  } catch (error) {
    console.error("Create Section Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Section with this code already exists for this class",
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
    const {
      schoolId,
      academicYearId,
      classId,
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

    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }

      filter.classId = classId;
    }

    if (status) {
      filter.status = status;
    }

    const sections = await Section.find(filter)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Sections fetched successfully",
      count: sections.length,
      sections,
    });
  } catch (error) {
    console.error("Get All Sections Error:", error);

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
        message: "Invalid Section ID",
      });
    }

    const section = await Section.findById(id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
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
      section,
    });
  } catch (error) {
    console.error("Get Section By ID Error:", error);

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
        message: "Invalid Section ID",
      });
    }

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      roomNumber,
      capacity,
      status,
    } = req.body;

    const finalSchoolId =
      schoolId || section.schoolId.toString();

    const finalAcademicYearId =
      academicYearId || section.academicYearId.toString();

    const finalClassId =
      classId || section.classId.toString();

    // Check School
    const school = await School.findById(finalSchoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check Academic Year
    const academicYear =
      await AcademicYear.findById(finalAcademicYearId);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic Year not found",
      });
    }

    // Academic Year must belong to School
    if (
      academicYear.schoolId.toString() !==
      finalSchoolId
    ) {
      return res.status(400).json({
        success: false,
        message: "Academic Year does not belong to this school",
      });
    }

    // Check Class
    const classData = await Class.findById(finalClassId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Class consistency check
    if (
      classData.schoolId.toString() !== finalSchoolId ||
      classData.academicYearId.toString() !==
        finalAcademicYearId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to the selected school and academic year",
      });
    }

    // Final Section Code
    const finalCode = code
      ? code.toUpperCase()
      : section.code;

    // Duplicate check
    const duplicateSection = await Section.findOne({
      _id: { $ne: id },
      schoolId: finalSchoolId,
      academicYearId: finalAcademicYearId,
      classId: finalClassId,
      code: finalCode,
    });

    if (duplicateSection) {
      return res.status(409).json({
        success: false,
        message:
          "Section with this code already exists for this class",
      });
    }

    // Update fields
    section.schoolId = finalSchoolId;
    section.academicYearId = finalAcademicYearId;
    section.classId = finalClassId;

    if (name !== undefined) {
      section.name = name;
    }

    if (code !== undefined) {
      section.code = finalCode;
    }

    if (roomNumber !== undefined) {
      section.roomNumber = roomNumber;
    }

    if (capacity !== undefined) {
      section.capacity = capacity;
    }

    if (status !== undefined) {
      section.status = status;
    }

    await section.save();

    // Populate updated Section
    const updatedSection = await Section.findById(section._id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code");

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
    });
  } catch (error) {
    console.error("Update Section Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Section with this code already exists for this class",
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
        message: "Invalid Section ID",
      });
    }

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await Section.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error("Delete Section Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete section",
      error: error.message,
    });
  }
};
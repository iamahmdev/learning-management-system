import mongoose from "mongoose";
import Subject from "../models/subject.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";

// Create Subject
export const createSubject = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      description,
      maxMarks,
      passingMarks,
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

    // Academic Year must belong to selected School
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

    // Check duplicate Subject
    const existingSubject = await Subject.findOne({
      schoolId,
      academicYearId,
      classId,
      code: code.toUpperCase(),
    });

    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: "Subject with this code already exists for this class",
      });
    }

    // Validate passing marks
    const finalMaxMarks = maxMarks ?? 100;
    const finalPassingMarks = passingMarks;

    if (finalPassingMarks > finalMaxMarks) {
      return res.status(400).json({
        success: false,
        message: "Passing marks cannot be greater than maximum marks",
      });
    }

    // Create Subject
    const subject = await Subject.create({
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      description,
      maxMarks: finalMaxMarks,
      passingMarks: finalPassingMarks,
      status,
    });

    // Populate Subject
    const populatedSubject = await Subject.findById(subject._id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code");

    return res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: populatedSubject,
    });
  } catch (error) {
    console.error("Create Subject Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Subject with this code already exists for this class",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create subject",
      error: error.message,
    });
  }
};

// Get All Subjects
export const getAllSubjects = async (req, res) => {
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
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be active or inactive",
        });
      }

      filter.status = status;
    }

    const subjects = await Subject.find(filter)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error("Get All Subjects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
      error: error.message,
    });
  }
};

// Get Subject By ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subject ID",
      });
    }

    const subject = await Subject.findById(id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code");

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      subject,
    });
  } catch (error) {
    console.error("Get Subject By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subject",
      error: error.message,
    });
  }
};

// Update Subject
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subject ID",
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      description,
      maxMarks,
      passingMarks,
      status,
    } = req.body;

    const finalSchoolId =
      schoolId || subject.schoolId.toString();

    const finalAcademicYearId =
      academicYearId || subject.academicYearId.toString();

    const finalClassId =
      classId || subject.classId.toString();

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

    // Class must belong to School and Academic Year
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

    // Final Code
    const finalCode = code
      ? code.toUpperCase()
      : subject.code;

    // Final Marks
    const finalMaxMarks =
      maxMarks !== undefined
        ? Number(maxMarks)
        : subject.maxMarks;

    const finalPassingMarks =
      passingMarks !== undefined
        ? Number(passingMarks)
        : subject.passingMarks;

    if (finalPassingMarks > finalMaxMarks) {
      return res.status(400).json({
        success: false,
        message:
          "Passing marks cannot be greater than maximum marks",
      });
    }

    // Duplicate check
    const duplicateSubject = await Subject.findOne({
      _id: { $ne: id },
      schoolId: finalSchoolId,
      academicYearId: finalAcademicYearId,
      classId: finalClassId,
      code: finalCode,
    });

    if (duplicateSubject) {
      return res.status(409).json({
        success: false,
        message:
          "Subject with this code already exists for this class",
      });
    }

    // Update fields
    subject.schoolId = finalSchoolId;
    subject.academicYearId = finalAcademicYearId;
    subject.classId = finalClassId;

    if (name !== undefined) {
      subject.name = name;
    }

    if (code !== undefined) {
      subject.code = finalCode;
    }

    if (description !== undefined) {
      subject.description = description;
    }

    if (maxMarks !== undefined) {
      subject.maxMarks = finalMaxMarks;
    }

    if (passingMarks !== undefined) {
      subject.passingMarks = finalPassingMarks;
    }

    if (status !== undefined) {
      subject.status = status;
    }

    await subject.save();

    // Populate updated Subject
    const updatedSubject = await Subject.findById(subject._id)
      .populate("schoolId", "name code")
      .populate(
        "academicYearId",
        "name startDate endDate isCurrent status"
      )
      .populate("classId", "name code");

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    console.error("Update Subject Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Subject with this code already exists for this class",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update subject",
      error: error.message,
    });
  }
};

// Delete Subject
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subject ID",
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    await Subject.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("Delete Subject Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error: error.message,
    });
  }
};
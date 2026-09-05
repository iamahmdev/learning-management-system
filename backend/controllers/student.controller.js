import mongoose from "mongoose";

import Student from "../models/student.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";
import Section from "../models/section.model.js";

// =====================================================
// CREATE STUDENT
// =====================================================
export const createStudent = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      academicYearId,
      classId,
      sectionId,
      admissionNumber,
      rollNumber,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      admissionDate,
      status,
    } = req.body;

    // Validate User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "User role must be student",
      });
    }

    // Validate School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate Academic Year
    const academicYear = await AcademicYear.findById(academicYearId);

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    if (academicYear.schoolId.toString() !== schoolId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Academic year does not belong to this school",
      });
    }

    // Validate Class
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    if (
      classData.schoolId.toString() !== schoolId.toString() ||
      classData.academicYearId.toString() !== academicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to the selected school and academic year",
      });
    }

    // Validate Section
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    if (
      section.schoolId.toString() !== schoolId.toString() ||
      section.academicYearId.toString() !== academicYearId.toString() ||
      section.classId.toString() !== classId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to the selected school, academic year and class",
      });
    }

    // Check if User already has Student profile
    const existingStudent = await Student.findOne({ userId });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student profile already exists for this user",
      });
    }

    // Check duplicate Admission Number in same school
    const duplicateAdmissionNumber = await Student.findOne({
      schoolId,
      admissionNumber: admissionNumber.toUpperCase(),
    });

    if (duplicateAdmissionNumber) {
      return res.status(409).json({
        success: false,
        message: "Admission number already exists in this school",
      });
    }

    // Create Student
    const student = await Student.create({
      userId,
      schoolId,
      academicYearId,
      classId,
      sectionId,
      admissionNumber,
      rollNumber,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      admissionDate,
      status,
    });

    // Populate relations
    await student.populate([
      {
        path: "userId",
        select: "name email role phone profile status",
      },
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate isCurrent status",
      },
      {
        path: "classId",
        select: "name code description status",
      },
      {
        path: "sectionId",
        select: "name code roomNumber capacity status",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Create Student Error:", error);

    // MongoDB duplicate key
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate student record",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL STUDENTS
// =====================================================
export const getAllStudents = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      status,
      gender,
    } = req.query;

    const filter = {};

    // Validate query ObjectIds
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

    if (sectionId) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Section ID",
        });
      }

      filter.sectionId = sectionId;
    }

    // Validate status
    if (status) {
      const allowedStatuses = [
        "active",
        "inactive",
        "graduated",
        "transferred",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid student status",
        });
      }

      filter.status = status;
    }

    // Validate gender
    if (gender) {
      const allowedGenders = ["male", "female", "other"];

      if (!allowedGenders.includes(gender)) {
        return res.status(400).json({
          success: false,
          message: "Invalid gender",
        });
      }

      filter.gender = gender;
    }

    const students = await Student.find(filter)
      .populate({
        path: "userId",
        select: "name email role phone profile status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate isCurrent status",
      })
      .populate({
        path: "classId",
        select: "name code description status",
      })
      .populate({
        path: "sectionId",
        select: "name code roomNumber capacity status",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get All Students Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// =====================================================
// GET STUDENT BY ID
// =====================================================
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    const student = await Student.findById(id)
      .populate({
        path: "userId",
        select: "name email role phone profile status",
      })
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate isCurrent status",
      })
      .populate({
        path: "classId",
        select: "name code description status",
      })
      .populate({
        path: "sectionId",
        select: "name code roomNumber capacity status",
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      student,
    });
  } catch (error) {
    console.error("Get Student By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE STUDENT
// =====================================================
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const {
      userId,
      schoolId,
      academicYearId,
      classId,
      sectionId,
      admissionNumber,
      rollNumber,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      admissionDate,
      status,
    } = req.body;

    const finalUserId = userId || student.userId;
    const finalSchoolId = schoolId || student.schoolId;
    const finalAcademicYearId =
      academicYearId || student.academicYearId;
    const finalClassId = classId || student.classId;
    const finalSectionId = sectionId || student.sectionId;

    // Validate User
    const user = await User.findById(finalUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "User role must be student",
      });
    }

    // Prevent duplicate User relation
    const existingUserStudent = await Student.findOne({
      userId: finalUserId,
      _id: { $ne: id },
    });

    if (existingUserStudent) {
      return res.status(409).json({
        success: false,
        message: "Another student profile already uses this user",
      });
    }

    // Validate School
    const school = await School.findById(finalSchoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate Academic Year
    const academicYear = await AcademicYear.findById(
      finalAcademicYearId
    );

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    if (
      academicYear.schoolId.toString() !==
      finalSchoolId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Academic year does not belong to this school",
      });
    }

    // Validate Class
    const classData = await Class.findById(finalClassId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    if (
      classData.schoolId.toString() !==
        finalSchoolId.toString() ||
      classData.academicYearId.toString() !==
        finalAcademicYearId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Class does not belong to the selected school and academic year",
      });
    }

    // Validate Section
    const section = await Section.findById(finalSectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    if (
      section.schoolId.toString() !==
        finalSchoolId.toString() ||
      section.academicYearId.toString() !==
        finalAcademicYearId.toString() ||
      section.classId.toString() !== finalClassId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Section does not belong to the selected school, academic year and class",
      });
    }

    // Final Admission Number
    const finalAdmissionNumber =
      admissionNumber || student.admissionNumber;

    // Duplicate Admission Number
    const duplicateAdmissionNumber = await Student.findOne({
      schoolId: finalSchoolId,
      admissionNumber: finalAdmissionNumber.toUpperCase(),
      _id: { $ne: id },
    });

    if (duplicateAdmissionNumber) {
      return res.status(409).json({
        success: false,
        message: "Admission number already exists in this school",
      });
    }

    // Update fields
    student.userId = finalUserId;
    student.schoolId = finalSchoolId;
    student.academicYearId = finalAcademicYearId;
    student.classId = finalClassId;
    student.sectionId = finalSectionId;

    if (admissionNumber !== undefined) {
      student.admissionNumber = admissionNumber;
    }

    if (rollNumber !== undefined) {
      student.rollNumber = rollNumber;
    }

    if (dateOfBirth !== undefined) {
      student.dateOfBirth = dateOfBirth;
    }

    if (gender !== undefined) {
      student.gender = gender;
    }

    if (bloodGroup !== undefined) {
      student.bloodGroup = bloodGroup;
    }

    if (address !== undefined) {
      student.address = address;
    }

    if (admissionDate !== undefined) {
      student.admissionDate = admissionDate;
    }

    if (status !== undefined) {
      student.status = status;
    }

    await student.save();

    await student.populate([
      {
        path: "userId",
        select: "name email role phone profile status",
      },
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate isCurrent status",
      },
      {
        path: "classId",
        select: "name code description status",
      },
      {
        path: "sectionId",
        select: "name code roomNumber capacity status",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate student record",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE STUDENT
// =====================================================
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};
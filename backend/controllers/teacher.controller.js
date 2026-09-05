import mongoose from "mongoose";

import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

// Create Teacher
export const createTeacher = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      employeeId,
      qualification,
      specialization,
      joiningDate,
      employmentType,
      salary,
      status,
    } = req.body;

    // Check User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User must have teacher role
    if (user.role !== "teacher") {
      return res.status(400).json({
        success: false,
        message: "Selected user does not have teacher role",
      });
    }

    // Check School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check if User already has Teacher profile
    const existingTeacherByUser = await Teacher.findOne({
      userId,
    });

    if (existingTeacherByUser) {
      return res.status(409).json({
        success: false,
        message: "Teacher profile already exists for this user",
      });
    }

    // Check duplicate Employee ID in same School
    const existingTeacherByEmployeeId = await Teacher.findOne({
      schoolId,
      employeeId: employeeId.toUpperCase(),
    });

    if (existingTeacherByEmployeeId) {
      return res.status(409).json({
        success: false,
        message: "Employee ID already exists in this school",
      });
    }

    // Create Teacher
    const teacher = await Teacher.create({
      userId,
      schoolId,
      employeeId,
      qualification,
      specialization,
      joiningDate,
      employmentType,
      salary,
      status,
    });

    // Populate Teacher
    const populatedTeacher = await Teacher.findById(teacher._id)
      .populate(
        "userId",
        "name email role phone profile status"
      )
      .populate("schoolId", "name code email phone");

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher: populatedTeacher,
    });
  } catch (error) {
    console.error("Create Teacher Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Teacher with this user or employee ID already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// Get All Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const {
      schoolId,
      status,
      employmentType,
    } = req.query;

    const filter = {};

    // School Filter
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }

      filter.schoolId = schoolId;
    }

    // Status Filter
    if (status) {
      if (
        !["active", "inactive", "on-leave"].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Status must be active, inactive or on-leave",
        });
      }

      filter.status = status;
    }

    // Employment Type Filter
    if (employmentType) {
      if (
        !["full-time", "part-time", "contract"].includes(
          employmentType
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Employment type must be full-time, part-time or contract",
        });
      }

      filter.employmentType = employmentType;
    }

    const teachers = await Teacher.find(filter)
      .populate(
        "userId",
        "name email role phone profile status"
      )
      .populate("schoolId", "name code email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    console.error("Get All Teachers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

// Get Teacher By ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher ID",
      });
    }

    const teacher = await Teacher.findById(id)
      .populate(
        "userId",
        "name email role phone profile status"
      )
      .populate("schoolId", "name code email phone");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Teacher fetched successfully",
      teacher,
    });
  } catch (error) {
    console.error("Get Teacher By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};

// Update Teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher ID",
      });
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const {
      userId,
      schoolId,
      employeeId,
      qualification,
      specialization,
      joiningDate,
      employmentType,
      salary,
      status,
    } = req.body;

    const finalUserId =
      userId || teacher.userId.toString();

    const finalSchoolId =
      schoolId || teacher.schoolId.toString();

    // Check User
    const user = await User.findById(finalUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User must have teacher role
    if (user.role !== "teacher") {
      return res.status(400).json({
        success: false,
        message: "Selected user does not have teacher role",
      });
    }

    // Check School
    const school = await School.findById(finalSchoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Prevent same User from being assigned to another Teacher
    const duplicateUser = await Teacher.findOne({
      _id: { $ne: id },
      userId: finalUserId,
    });

    if (duplicateUser) {
      return res.status(409).json({
        success: false,
        message:
          "This user is already assigned to another teacher profile",
      });
    }

    // Final Employee ID
    const finalEmployeeId = employeeId
      ? employeeId.toUpperCase()
      : teacher.employeeId;

    // Prevent duplicate Employee ID in same School
    const duplicateEmployeeId = await Teacher.findOne({
      _id: { $ne: id },
      schoolId: finalSchoolId,
      employeeId: finalEmployeeId,
    });

    if (duplicateEmployeeId) {
      return res.status(409).json({
        success: false,
        message:
          "Employee ID already exists in this school",
      });
    }

    // Update Teacher
    teacher.userId = finalUserId;
    teacher.schoolId = finalSchoolId;

    if (employeeId !== undefined) {
      teacher.employeeId = finalEmployeeId;
    }

    if (qualification !== undefined) {
      teacher.qualification = qualification;
    }

    if (specialization !== undefined) {
      teacher.specialization = specialization;
    }

    if (joiningDate !== undefined) {
      teacher.joiningDate = joiningDate;
    }

    if (employmentType !== undefined) {
      teacher.employmentType = employmentType;
    }

    if (salary !== undefined) {
      teacher.salary = salary;
    }

    if (status !== undefined) {
      teacher.status = status;
    }

    await teacher.save();

    // Populate Updated Teacher
    const updatedTeacher = await Teacher.findById(
      teacher._id
    )
      .populate(
        "userId",
        "name email role phone profile status"
      )
      .populate("schoolId", "name code email phone");

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Update Teacher Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Teacher with this user or employee ID already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};

// Delete Teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Teacher ID",
      });
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    await Teacher.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error("Delete Teacher Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};
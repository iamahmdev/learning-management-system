import mongoose from "mongoose";
import Student from "../models/student.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const sendError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(error && { error: error.message }),
  });
};

// =====================================================
// CREATE STUDENT
// =====================================================

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    const populatedStudent = await Student.findById(student._id)
      .populate("userId", "name email role")
      .populate("schoolId", "name")
      .populate("academicYearId")
      .populate("classId")
      .populate("sectionId");

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: populatedStudent,
    });
  } catch (error) {
    console.error("Create Student Error:", error);

    // Duplicate admission number
    if (error.code === 11000) {
      return sendError(
        res,
        409,
        "A student with this admission number already exists in this school"
      );
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return sendError(
        res,
        400,
        "Student validation failed",
        error
      );
    }

    return sendError(
      res,
      500,
      "Failed to create student",
      error
    );
  }
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      schoolId,
      academicYearId,
      classId,
      sectionId,
      status,
      gender,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.min(
      Math.max(Number(limit), 1),
      100
    );

    const skip =
      (currentPage - 1) * itemsPerPage;

    const filter = {};

    // =================================================
    // OBJECT ID FILTERS
    // =================================================

    if (schoolId) {
      if (!isValidObjectId(schoolId)) {
        return sendError(
          res,
          400,
          "Invalid school ID"
        );
      }

      filter.schoolId = schoolId;
    }

    if (academicYearId) {
      if (!isValidObjectId(academicYearId)) {
        return sendError(
          res,
          400,
          "Invalid academic year ID"
        );
      }

      filter.academicYearId = academicYearId;
    }

    if (classId) {
      if (!isValidObjectId(classId)) {
        return sendError(
          res,
          400,
          "Invalid class ID"
        );
      }

      filter.classId = classId;
    }

    if (sectionId) {
      if (!isValidObjectId(sectionId)) {
        return sendError(
          res,
          400,
          "Invalid section ID"
        );
      }

      filter.sectionId = sectionId;
    }

    // =================================================
    // STATUS FILTER
    // =================================================

    if (status) {
      filter.status = status;
    }

    // =================================================
    // GENDER FILTER
    // =================================================

    if (gender) {
      filter.gender = gender;
    }

    // =================================================
    // SEARCH
    // =================================================

    if (search.trim()) {
      filter.$or = [
        {
          admissionNumber: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          rollNumber: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          "guardian.name": {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // =================================================
    // FETCH STUDENTS
    // =================================================

    const [students, totalStudents] =
      await Promise.all([
        Student.find(filter)
          .populate(
            "userId",
            "name email role"
          )
          .populate(
            "schoolId",
            "name"
          )
          .populate("academicYearId")
          .populate("classId")
          .populate("sectionId")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(itemsPerPage),

        Student.countDocuments(filter),
      ]);

    const totalPages = Math.ceil(
      totalStudents / itemsPerPage
    );

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",

      data: students,

      pagination: {
        currentPage,
        itemsPerPage,
        totalStudents,
        totalPages,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },
    });
  } catch (error) {
    console.error(
      "Get All Students Error:",
      error
    );

    return sendError(
      res,
      500,
      "Failed to fetch students",
      error
    );
  }
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

export const getStudentById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(
        res,
        400,
        "Invalid student ID"
      );
    }

    const student = await Student.findById(id)
      .populate(
        "userId",
        "name email role"
      )
      .populate(
        "schoolId",
        "name"
      )
      .populate("academicYearId")
      .populate("classId")
      .populate("sectionId");

    if (!student) {
      return sendError(
        res,
        404,
        "Student not found"
      );
    }

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    console.error(
      "Get Student By ID Error:",
      error
    );

    return sendError(
      res,
      500,
      "Failed to fetch student",
      error
    );
  }
};

// =====================================================
// UPDATE STUDENT
// =====================================================

export const updateStudent = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(
        res,
        400,
        "Invalid student ID"
      );
    }

    // =================================================
    // PREVENT EMPTY UPDATE
    // =================================================

    if (
      !req.body ||
      Object.keys(req.body).length === 0
    ) {
      return sendError(
        res,
        400,
        "No update data provided"
      );
    }

    // =================================================
    // UPDATE STUDENT
    // =================================================

    const student =
      await Student.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      )
        .populate(
          "userId",
          "name email role"
        )
        .populate(
          "schoolId",
          "name"
        )
        .populate("academicYearId")
        .populate("classId")
        .populate("sectionId");

    if (!student) {
      return sendError(
        res,
        404,
        "Student not found"
      );
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error(
      "Update Student Error:",
      error
    );

    // Duplicate admission number
    if (error.code === 11000) {
      return sendError(
        res,
        409,
        "A student with this admission number already exists in this school"
      );
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return sendError(
        res,
        400,
        "Student validation failed",
        error
      );
    }

    return sendError(
      res,
      500,
      "Failed to update student",
      error
    );
  }
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const deleteStudent = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(
        res,
        400,
        "Invalid student ID"
      );
    }

    const student =
      await Student.findByIdAndDelete(id);

    if (!student) {
      return sendError(
        res,
        404,
        "Student not found"
      );
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: {
        id: student._id,
        admissionNumber:
          student.admissionNumber,
      },
    });
  } catch (error) {
    console.error(
      "Delete Student Error:",
      error
    );

    return sendError(
      res,
      500,
      "Failed to delete student",
      error
    );
  }
};

// =====================================================
// GET STUDENT BY ADMISSION NUMBER
// =====================================================

export const getStudentByAdmissionNumber =
  async (req, res) => {
    try {
      const { admissionNumber } = req.params;

      if (
        !admissionNumber ||
        !admissionNumber.trim()
      ) {
        return sendError(
          res,
          400,
          "Admission number is required"
        );
      }

      const student =
        await Student.findOne({
          admissionNumber:
            admissionNumber.trim(),
        })
          .populate(
            "userId",
            "name email role"
          )
          .populate(
            "schoolId",
            "name"
          )
          .populate("academicYearId")
          .populate("classId")
          .populate("sectionId");

      if (!student) {
        return sendError(
          res,
          404,
          "Student not found"
        );
      }

      return res.status(200).json({
        success: true,
        message:
          "Student fetched successfully",
        data: student,
      });
    } catch (error) {
      console.error(
        "Get Student By Admission Number Error:",
        error
      );

      return sendError(
        res,
        500,
        "Failed to fetch student",
        error
      );
    }
  };

// =====================================================
// GET STUDENTS BY CLASS
// =====================================================

export const getStudentsByClass =
  async (req, res) => {
    try {
      const { classId } = req.params;

      if (!isValidObjectId(classId)) {
        return sendError(
          res,
          400,
          "Invalid class ID"
        );
      }

      const students =
        await Student.find({
          classId,
        })
          .populate(
            "userId",
            "name email role"
          )
          .populate(
            "schoolId",
            "name"
          )
          .populate("academicYearId")
          .populate("sectionId")
          .sort({
            rollNumber: 1,
          });

      return res.status(200).json({
        success: true,
        message:
          "Class students fetched successfully",
        count: students.length,
        data: students,
      });
    } catch (error) {
      console.error(
        "Get Students By Class Error:",
        error
      );

      return sendError(
        res,
        500,
        "Failed to fetch class students",
        error
      );
    }
  };

// =====================================================
// GET STUDENTS BY SECTION
// =====================================================

export const getStudentsBySection =
  async (req, res) => {
    try {
      const { sectionId } = req.params;

      if (!isValidObjectId(sectionId)) {
        return sendError(
          res,
          400,
          "Invalid section ID"
        );
      }

      const students =
        await Student.find({
          sectionId,
        })
          .populate(
            "userId",
            "name email role"
          )
          .populate(
            "schoolId",
            "name"
          )
          .populate("academicYearId")
          .populate("classId")
          .sort({
            rollNumber: 1,
          });

      return res.status(200).json({
        success: true,
        message:
          "Section students fetched successfully",
        count: students.length,
        data: students,
      });
    } catch (error) {
      console.error(
        "Get Students By Section Error:",
        error
      );

      return sendError(
        res,
        500,
        "Failed to fetch section students",
        error
      );
    }
  };
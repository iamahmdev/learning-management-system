import { query, validationResult } from "express-validator";
import mongoose from "mongoose";

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// =====================================================
// SCHOOL DASHBOARD VALIDATION
// =====================================================

export const validateSchoolDashboard = [
  query("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// STUDENT DASHBOARD VALIDATION
// =====================================================

export const validateStudentDashboard = [
  query("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid student ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// TEACHER DASHBOARD VALIDATION
// =====================================================

export const validateTeacherDashboard = [
  query("teacherId")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
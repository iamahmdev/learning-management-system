import { body, param, query } from "express-validator";
import mongoose from "mongoose";

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const validateTimeFormat = (value) => {
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
};

// =====================================================
// CREATE TIMETABLE VALIDATION
// =====================================================

export const validateCreateTimetable = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("academicYearId")
    .notEmpty()
    .withMessage("Academic Year ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  body("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid class ID format"),

  body("sectionId")
    .notEmpty()
    .withMessage("Section ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid section ID format"),

  body("subjectId")
    .notEmpty()
    .withMessage("Subject ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid subject ID format"),

  body("teacherId")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

  body("dayOfWeek")
    .notEmpty()
    .withMessage("Day of week is required")
    .isIn(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
    .withMessage("Invalid day of week"),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .custom(validateTimeFormat)
    .withMessage("Start time must be in HH:MM format (24-hour)"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .custom(validateTimeFormat)
    .withMessage("End time must be in HH:MM format (24-hour)"),

  body("room")
    .notEmpty()
    .withMessage("Room is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Room must be between 1 and 50 characters")
    .trim(),

  body("periodNumber")
    .notEmpty()
    .withMessage("Period number is required")
    .isInt({ min: 1, max: 15 })
    .withMessage("Period number must be between 1 and 15"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended"),

  body("remarks")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters")
    .trim(),

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
// UPDATE TIMETABLE VALIDATION
// =====================================================

export const validateUpdateTimetable = [
  body("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("academicYearId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  body("classId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid class ID format"),

  body("sectionId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid section ID format"),

  body("subjectId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid subject ID format"),

  body("teacherId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

  body("dayOfWeek")
    .optional()
    .isIn(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
    .withMessage("Invalid day of week"),

  body("startTime")
    .optional()
    .custom(validateTimeFormat)
    .withMessage("Start time must be in HH:MM format (24-hour)"),

  body("endTime")
    .optional()
    .custom(validateTimeFormat)
    .withMessage("End time must be in HH:MM format (24-hour)"),

  body("room")
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage("Room must be between 1 and 50 characters")
    .trim(),

  body("periodNumber")
    .optional()
    .isInt({ min: 1, max: 15 })
    .withMessage("Period number must be between 1 and 15"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended"),

  body("remarks")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters")
    .trim(),

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
// TIMETABLE ID VALIDATION
// =====================================================

export const validateTimetableId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid timetable ID format"),

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
// QUERY VALIDATION
// =====================================================

export const validateTimetableQuery = [
  query("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  query("academicYearId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  query("classId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid class ID format"),

  query("sectionId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid section ID format"),

  query("teacherId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

  query("dayOfWeek")
    .optional()
    .isIn(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
    .withMessage("Invalid day of week"),

  query("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

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
// WEEKLY TIMETABLE VALIDATION
// =====================================================

export const validateWeeklyTimetable = [
  query("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  query("academicYearId")
    .notEmpty()
    .withMessage("Academic Year ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  query("classId")
    .notEmpty()
    .withMessage("Class ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid class ID format"),

  query("sectionId")
    .notEmpty()
    .withMessage("Section ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid section ID format"),

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

// Import validationResult - this should be at the top but adding here for completeness
import { validationResult } from "express-validator";
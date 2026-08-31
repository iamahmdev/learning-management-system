import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const validateFutureDate = (value) => {
  return new Date(value) > new Date();
};

// =====================================================
// CREATE ASSIGNMENT VALIDATION
// =====================================================

export const validateCreateAssignment = [
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

  body("teacherId")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

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

  body("title")
    .notEmpty()
    .withMessage("Assignment title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Assignment title must be between 3 and 200 characters")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Assignment description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Assignment description must be between 10 and 2000 characters")
    .trim(),

  body("instructions")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Instructions cannot exceed 1000 characters")
    .trim(),

  body("assignedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid assigned date format")
    .toDate(),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid due date format")
    .toDate(),

  body("maxMarks")
    .notEmpty()
    .withMessage("Maximum marks is required")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Maximum marks must be between 1 and 1000"),

  body("attachmentUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Attachment URL cannot exceed 500 characters")
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  body("submissionType")
    .optional()
    .isIn(["online", "offline", "both"])
    .withMessage("Submission type must be online, offline, or both"),

  body("allowLateSubmission")
    .optional()
    .isBoolean()
    .withMessage("allowLateSubmission must be a boolean value"),

  body("lateSubmissionPenalty")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Late submission penalty must be between 0 and 100"),

  body("status")
    .optional()
    .isIn(["draft", "published", "closed", "archived"])
    .withMessage("Status must be draft, published, closed, or archived"),

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
// UPDATE ASSIGNMENT VALIDATION
// =====================================================

export const validateUpdateAssignment = [
  body("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("academicYearId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  body("teacherId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

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

  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Assignment title must be between 3 and 200 characters")
    .trim(),

  body("description")
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Assignment description must be between 10 and 2000 characters")
    .trim(),

  body("instructions")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Instructions cannot exceed 1000 characters")
    .trim(),

  body("assignedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid assigned date format")
    .toDate(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date format")
    .toDate(),

  body("maxMarks")
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage("Maximum marks must be between 1 and 1000"),

  body("attachmentUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Attachment URL cannot exceed 500 characters")
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  body("submissionType")
    .optional()
    .isIn(["online", "offline", "both"])
    .withMessage("Submission type must be online, offline, or both"),

  body("allowLateSubmission")
    .optional()
    .isBoolean()
    .withMessage("allowLateSubmission must be a boolean value"),

  body("lateSubmissionPenalty")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Late submission penalty must be between 0 and 100"),

  body("status")
    .optional()
    .isIn(["draft", "published", "closed", "archived"])
    .withMessage("Status must be draft, published, closed, or archived"),

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
// ASSIGNMENT ID VALIDATION
// =====================================================

export const validateAssignmentId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid assignment ID format"),

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
// ASSIGNMENT QUERY VALIDATION
// =====================================================

export const validateAssignmentQuery = [
  query("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  query("academicYearId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid academic year ID format"),

  query("teacherId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid teacher ID format"),

  query("classId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid class ID format"),

  query("sectionId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid section ID format"),

  query("subjectId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid subject ID format"),

  query("status")
    .optional()
    .isIn(["draft", "published", "closed", "archived"])
    .withMessage("Status must be draft, published, closed, or archived"),

  query("isActive")
    .optional()
    .isIn(['true', 'false'])
    .withMessage("isActive must be true or false"),

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
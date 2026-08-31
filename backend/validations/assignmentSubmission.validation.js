import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// =====================================================
// SUBMIT ASSIGNMENT VALIDATION
// =====================================================

export const validateSubmitAssignment = [
  body("assignmentId")
    .notEmpty()
    .withMessage("Assignment ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid assignment ID format"),

  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid student ID format"),

  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("submissionText")
    .optional()
    .isLength({ max: 5000 })
    .withMessage("Submission text cannot exceed 5000 characters")
    .trim(),

  body("attachmentUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Attachment URL cannot exceed 500 characters")
    .trim(),

  body("remarks")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters")
    .trim(),

  // Custom validation to ensure either submissionText or attachmentUrl is provided
  body()
    .custom((body) => {
      if (!body.submissionText && !body.attachmentUrl) {
        throw new Error("Either submission text or attachment URL is required");
      }
      return true;
    }),

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
// GRADE SUBMISSION VALIDATION
// =====================================================

export const validateGradeSubmission = [
  body("marksObtained")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Marks obtained must be a positive number"),

  body("feedback")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Feedback cannot exceed 1000 characters")
    .trim(),

  body("gradedBy")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid graded by user ID format"),

  body("status")
    .optional()
    .isIn(["submitted", "graded", "returned", "resubmitted"])
    .withMessage("Status must be submitted, graded, returned, or resubmitted"),

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
// UPDATE SUBMISSION VALIDATION
// =====================================================

export const validateUpdateSubmission = [
  body("submissionText")
    .optional()
    .isLength({ max: 5000 })
    .withMessage("Submission text cannot exceed 5000 characters")
    .trim(),

  body("attachmentUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Attachment URL cannot exceed 500 characters")
    .trim(),

  body("marksObtained")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Marks obtained must be a positive number"),

  body("feedback")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Feedback cannot exceed 1000 characters")
    .trim(),

  body("gradedBy")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid graded by user ID format"),

  body("status")
    .optional()
    .isIn(["submitted", "graded", "returned", "resubmitted"])
    .withMessage("Status must be submitted, graded, returned, or resubmitted"),

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
// SUBMISSION ID VALIDATION
// =====================================================

export const validateSubmissionId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid submission ID format"),

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
// SUBMISSION QUERY VALIDATION
// =====================================================

export const validateSubmissionQuery = [
  query("assignmentId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid assignment ID format"),

  query("studentId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid student ID format"),

  query("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  query("status")
    .optional()
    .isIn(["submitted", "graded", "returned", "resubmitted"])
    .withMessage("Status must be submitted, graded, returned, or resubmitted"),

  query("isLateSubmission")
    .optional()
    .isIn(['true', 'false'])
    .withMessage("isLateSubmission must be true or false"),

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
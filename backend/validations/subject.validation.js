import { body, param } from "express-validator";

// Create Subject Validation
export const createSubjectValidation = [
  body("schoolId")
    .trim()
    .notEmpty()
    .withMessage("School ID is required")
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("academicYearId")
    .trim()
    .notEmpty()
    .withMessage("Academic Year ID is required")
    .isMongoId()
    .withMessage("Invalid Academic Year ID"),

  body("classId")
    .trim()
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Subject name must be between 2 and 100 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Subject code is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Subject code must be between 2 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Subject code can only contain letters, numbers, hyphens and underscores"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("maxMarks")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Maximum marks must be at least 1"),

  body("passingMarks")
    .notEmpty()
    .withMessage("Passing marks are required")
    .isFloat({ min: 0 })
    .withMessage("Passing marks cannot be negative"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// Update Subject Validation
export const updateSubjectValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Subject ID"),

  body("schoolId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("academicYearId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Academic Year ID"),

  body("classId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Class ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Subject name must be between 2 and 100 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Subject code must be between 2 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Subject code can only contain letters, numbers, hyphens and underscores"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("maxMarks")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Maximum marks must be at least 1"),

  body("passingMarks")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Passing marks cannot be negative"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// Subject ID Validation
export const subjectIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Subject ID"),
];
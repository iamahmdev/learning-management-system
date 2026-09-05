import { body, param } from "express-validator";

// =====================================================
// CREATE CLASS VALIDATION
// =====================================================

export const createClassValidation = [
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

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Class name is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Class name must be between 1 and 50 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Class code is required")
    .isLength({ min: 1, max: 20 })
    .withMessage("Class code must be between 1 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Class code can only contain letters, numbers, hyphens and underscores"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// UPDATE CLASS VALIDATION
// =====================================================

export const updateClassValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Class ID"),

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

  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Class name must be between 1 and 50 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Class code must be between 1 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Class code can only contain letters, numbers, hyphens and underscores"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// CLASS ID VALIDATION
// =====================================================

export const classIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Class ID"),
];
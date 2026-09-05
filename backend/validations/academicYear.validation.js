import { body, param } from "express-validator";

// =====================================================
// CREATE ACADEMIC YEAR VALIDATION
// =====================================================

export const createAcademicYearValidation = [
  body("schoolId")
    .trim()
    .notEmpty()
    .withMessage("School ID is required")
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Academic year name is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Academic year name must be between 4 and 50 characters"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("isCurrent")
    .optional()
    .isBoolean()
    .withMessage("isCurrent must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// UPDATE ACADEMIC YEAR VALIDATION
// =====================================================

export const updateAcademicYearValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Academic Year ID"),

  body("schoolId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("Academic year name must be between 4 and 50 characters"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),

  body("isCurrent")
    .optional()
    .isBoolean()
    .withMessage("isCurrent must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// ACADEMIC YEAR ID VALIDATION
// =====================================================

export const academicYearIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Academic Year ID"),
];
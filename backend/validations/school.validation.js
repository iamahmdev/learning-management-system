import { body, param } from "express-validator";

// =====================================================
// CREATE SCHOOL VALIDATION
// =====================================================

export const createSchoolValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("School name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("School name must be between 2 and 100 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("School code is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("School code must be between 2 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "School code can only contain letters, numbers, hyphens and underscores"
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("School email is required")
    .isEmail()
    .withMessage("Please provide a valid school email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  body("address.street")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Street cannot exceed 150 characters"),

  body("address.city")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("City cannot exceed 50 characters"),

  body("address.state")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("State cannot exceed 50 characters"),

  body("address.country")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Country cannot exceed 50 characters"),

  body("address.postalCode")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Postal code cannot exceed 20 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please provide a valid website URL"),

  body("logo")
    .optional()
    .trim(),

  body("principal")
    .optional()
    .isMongoId()
    .withMessage("Invalid principal ID"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// UPDATE SCHOOL VALIDATION
// =====================================================

export const updateSchoolValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid school ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("School name must be between 2 and 100 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("School code must be between 2 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "School code can only contain letters, numbers, hyphens and underscores"
    ),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid school email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please provide a valid website URL"),

  body("logo")
    .optional()
    .trim(),

  body("principal")
    .optional()
    .isMongoId()
    .withMessage("Invalid principal ID"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// SCHOOL ID VALIDATION
// =====================================================

export const schoolIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid school ID"),
];
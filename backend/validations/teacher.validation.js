import { body, param } from "express-validator";

// Create Teacher Validation
export const createTeacherValidation = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),

  body("schoolId")
    .trim()
    .notEmpty()
    .withMessage("School ID is required")
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("employeeId")
    .trim()
    .notEmpty()
    .withMessage("Employee ID is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Employee ID must be between 2 and 30 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Employee ID can only contain letters, numbers, hyphens and underscores"
    ),

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required")
    .isLength({ min: 2, max: 150 })
    .withMessage(
      "Qualification must be between 2 and 150 characters"
    ),

  body("specialization")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage(
      "Specialization cannot exceed 150 characters"
    ),

  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required")
    .isISO8601()
    .withMessage("Joining date must be a valid date"),

  body("employmentType")
    .optional()
    .isIn(["full-time", "part-time", "contract"])
    .withMessage(
      "Employment type must be full-time, part-time or contract"
    ),

  body("salary")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Salary cannot be negative"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "on-leave"])
    .withMessage(
      "Status must be active, inactive or on-leave"
    ),
];

// Update Teacher Validation
export const updateTeacherValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Teacher ID"),

  body("userId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid User ID"),

  body("schoolId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("employeeId")
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Employee ID must be between 2 and 30 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Employee ID can only contain letters, numbers, hyphens and underscores"
    ),

  body("qualification")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage(
      "Qualification must be between 2 and 150 characters"
    ),

  body("specialization")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage(
      "Specialization cannot exceed 150 characters"
    ),

  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Joining date must be a valid date"),

  body("employmentType")
    .optional()
    .isIn(["full-time", "part-time", "contract"])
    .withMessage(
      "Employment type must be full-time, part-time or contract"
    ),

  body("salary")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Salary cannot be negative"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "on-leave"])
    .withMessage(
      "Status must be active, inactive or on-leave"
    ),
];

// Teacher ID Validation
export const teacherIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Teacher ID"),
];
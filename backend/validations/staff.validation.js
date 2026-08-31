import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateStaff = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid user ID format"),

  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Employee ID must be between 2 and 50 characters")
    .trim(),

  body("department")
    .notEmpty()
    .withMessage("Department is required")
    .isIn([
      "administration",
      "accounts",
      "academics",
      "sports",
      "library",
      "laboratory",
      "maintenance",
      "security",
      "transport",
      "canteen",
      "medical",
      "it",
      "other",
    ])
    .withMessage("Invalid department"),

  body("designation")
    .notEmpty()
    .withMessage("Designation is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Designation must be between 2 and 100 characters")
    .trim(),

  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required")
    .isISO8601()
    .withMessage("Invalid joining date format")
    .toDate(),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date of birth format")
    .toDate(),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

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

export const validateStaffId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid staff ID format"),

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
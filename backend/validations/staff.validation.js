import { body, param } from "express-validator";

export const createStaffValidation = [
  body("userId").trim().notEmpty().withMessage("User ID is required").isMongoId().withMessage("Invalid User ID"),
  body("schoolId").trim().notEmpty().withMessage("School ID is required").isMongoId().withMessage("Invalid School ID"),
  body("employeeId").trim().notEmpty().withMessage("Employee ID is required").isLength({ min: 2, max: 30 }).withMessage("Employee ID must be between 2 and 30 characters"),
  body("department").notEmpty().withMessage("Department is required").isIn(["administration", "accounts", "library", "laboratory", "sports", "transport", "security", "housekeeping", "it", "hr", "other"]),
  body("designation").trim().notEmpty().withMessage("Designation is required").isLength({ max: 100 }),
  body("dateOfJoining").notEmpty().withMessage("Date of joining is required").isISO8601().withMessage("Invalid date"),
  body("dateOfBirth").notEmpty().withMessage("Date of birth is required").isISO8601().withMessage("Invalid date"),
  body("gender").notEmpty().withMessage("Gender is required").isIn(["male", "female", "other"]),
  body("bloodGroup").optional().isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]),
  body("qualification").optional().trim().isLength({ max: 200 }),
  body("experience").optional().isInt({ min: 0 }),
  body("salary").optional().isFloat({ min: 0 }),
  body("status").optional().isIn(["active", "inactive", "resigned", "terminated"]),
];

export const updateStaffValidation = [
  param("id").isMongoId().withMessage("Invalid Staff ID"),
  body("employeeId").optional().trim().isLength({ min: 2, max: 30 }),
  body("department").optional().isIn(["administration", "accounts", "library", "laboratory", "sports", "transport", "security", "housekeeping", "it", "hr", "other"]),
  body("designation").optional().trim().isLength({ max: 100 }),
  body("dateOfJoining").optional().isISO8601(),
  body("dateOfBirth").optional().isISO8601(),
  body("gender").optional().isIn(["male", "female", "other"]),
  body("bloodGroup").optional().isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]),
  body("qualification").optional().trim().isLength({ max: 200 }),
  body("experience").optional().isInt({ min: 0 }),
  body("salary").optional().isFloat({ min: 0 }),
  body("status").optional().isIn(["active", "inactive", "resigned", "terminated"]),
];

export const staffIdValidation = [param("id").isMongoId().withMessage("Invalid Staff ID")];

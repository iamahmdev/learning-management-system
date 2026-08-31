import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateLeave = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("applicantId")
    .notEmpty()
    .withMessage("Applicant ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid applicant ID format"),

  body("applicantType")
    .notEmpty()
    .withMessage("Applicant type is required")
    .isIn(["student", "teacher", "staff", "parent"])
    .withMessage("Applicant type must be student, teacher, staff, or parent"),

  body("leaveType")
    .notEmpty()
    .withMessage("Leave type is required")
    .isIn([
      "sick",
      "casual",
      "emergency",
      "medical",
      "personal",
      "maternity",
      "paternity",
      "bereavement",
      "vacation",
      "study",
      "other",
    ])
    .withMessage("Invalid leave type"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date format")
    .toDate(),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("Invalid end date format")
    .toDate(),

  body("reason")
    .notEmpty()
    .withMessage("Leave reason is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Reason must be between 10 and 500 characters")
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

export const validateUpdateLeaveStatus = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["approved", "rejected"])
    .withMessage("Status must be approved or rejected"),

  body("approvedBy")
    .notEmpty()
    .withMessage("Approved by user ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid user ID format"),

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

export const validateLeaveId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid leave ID format"),

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
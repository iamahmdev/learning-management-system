import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const validateIssueBook = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid book ID format"),

  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid student ID format"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid due date format")
    .toDate(),

  body("issuedBy")
    .notEmpty()
    .withMessage("Issued by user ID is required")
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

export const validateReturnBook = [
  body("returnedTo")
    .notEmpty()
    .withMessage("Returned to user ID is required")
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

export const validateBookIssueId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid book issue ID format"),

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
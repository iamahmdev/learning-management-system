import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateBook = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("title")
    .notEmpty()
    .withMessage("Book title is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Book title must be between 2 and 200 characters")
    .trim(),

  body("author")
    .notEmpty()
    .withMessage("Book author is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Author name must be between 2 and 100 characters")
    .trim(),

  body("isbn")
    .optional()
    .isLength({ max: 20 })
    .withMessage("ISBN cannot exceed 20 characters")
    .trim(),

  body("totalQuantity")
    .notEmpty()
    .withMessage("Total quantity is required")
    .isInt({ min: 1, max: 10000 })
    .withMessage("Total quantity must be between 1 and 10000"),

  body("availableQuantity")
    .notEmpty()
    .withMessage("Available quantity is required")
    .isInt({ min: 0, max: 10000 })
    .withMessage("Available quantity must be between 0 and 10000"),

  body("bookCode")
    .notEmpty()
    .withMessage("Book code is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Book code must be between 2 and 50 characters")
    .trim(),

  body("addedBy")
    .notEmpty()
    .withMessage("Added by user ID is required")
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

export const validateBookId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid book ID format"),

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
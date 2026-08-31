import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

export const validateCreateEvent = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("title")
    .notEmpty()
    .withMessage("Event title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Event title must be between 3 and 200 characters")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Event description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Event description must be between 10 and 2000 characters")
    .trim(),

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required")
    .isISO8601()
    .withMessage("Invalid event date format")
    .toDate(),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Start time must be in HH:MM format (24-hour)"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("End time must be in HH:MM format (24-hour)"),

  body("location")
    .notEmpty()
    .withMessage("Event location is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Location must be between 2 and 200 characters")
    .trim(),

  body("organizer")
    .notEmpty()
    .withMessage("Organizer is required")
    .custom(validateObjectId)
    .withMessage("Invalid organizer ID format"),

  body("createdBy")
    .notEmpty()
    .withMessage("Created by user ID is required")
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

export const validateEventId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid event ID format"),

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
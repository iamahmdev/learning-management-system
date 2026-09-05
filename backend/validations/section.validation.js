import { body, param } from "express-validator";

export const createSectionValidation = [
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

  body("classId")
    .trim()
    .notEmpty()
    .withMessage("Class ID is required")
    .isMongoId()
    .withMessage("Invalid Class ID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Section name is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Section name must be between 1 and 50 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Section code is required")
    .isLength({ min: 1, max: 20 })
    .withMessage("Section code must be between 1 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Section code can only contain letters, numbers, hyphens and underscores"
    ),

  body("roomNumber")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Room number cannot exceed 20 characters"),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("classTeacher")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Class Teacher ID"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const updateSectionValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Section ID"),

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

  body("classId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Class ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Section name must be between 1 and 50 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Section code must be between 1 and 20 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Section code can only contain letters, numbers, hyphens and underscores"
    ),

  body("roomNumber")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Room number cannot exceed 20 characters"),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("classTeacher")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Class Teacher ID"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

export const sectionIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Section ID"),
];
import { body, param } from "express-validator";

// =====================================================
// CREATE RELATIONSHIP VALIDATION
// =====================================================

export const createParentStudentRelationshipValidation = [
  body("parentId")
    .trim()
    .notEmpty()
    .withMessage("Parent ID is required")
    .isMongoId()
    .withMessage("Invalid Parent ID"),

  body("studentId")
    .trim()
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("relationship")
    .trim()
    .notEmpty()
    .withMessage("Relationship is required")
    .isIn([
      "father",
      "mother",
      "guardian",
      "grandfather",
      "grandmother",
      "other",
    ])
    .withMessage("Invalid relationship"),

  body("isPrimary")
    .optional()
    .isBoolean()
    .withMessage("isPrimary must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// UPDATE RELATIONSHIP VALIDATION
// =====================================================

export const updateParentStudentRelationshipValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Relationship ID"),

  body("parentId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Parent ID"),

  body("studentId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("relationship")
    .optional()
    .trim()
    .isIn([
      "father",
      "mother",
      "guardian",
      "grandfather",
      "grandmother",
      "other",
    ])
    .withMessage("Invalid relationship"),

  body("isPrimary")
    .optional()
    .isBoolean()
    .withMessage("isPrimary must be true or false"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
];

// =====================================================
// ID VALIDATION
// =====================================================

export const parentStudentRelationshipIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Relationship ID"),
];
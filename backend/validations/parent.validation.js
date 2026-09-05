import { body, param } from "express-validator";

// =====================================================
// CREATE PARENT VALIDATION
// =====================================================
export const createParentValidation = [
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

  body("occupation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Occupation cannot exceed 100 characters"),

  body("alternatePhone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage(
      "Alternate phone cannot exceed 20 characters"
    ),

  body("address.street")
    .optional()
    .trim(),

  body("address.city")
    .optional()
    .trim(),

  body("address.state")
    .optional()
    .trim(),

  body("address.country")
    .optional()
    .trim(),

  body("address.postalCode")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage(
      "Status must be active or inactive"
    ),
];

// =====================================================
// UPDATE PARENT VALIDATION
// =====================================================
export const updateParentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Parent ID"),

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

  body("occupation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "Occupation cannot exceed 100 characters"
    ),

  body("alternatePhone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage(
      "Alternate phone cannot exceed 20 characters"
    ),

  body("address.street")
    .optional()
    .trim(),

  body("address.city")
    .optional()
    .trim(),

  body("address.state")
    .optional()
    .trim(),

  body("address.country")
    .optional()
    .trim(),

  body("address.postalCode")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage(
      "Status must be active or inactive"
    ),
];

// =====================================================
// PARENT ID VALIDATION
// =====================================================
export const parentIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Parent ID"),
];
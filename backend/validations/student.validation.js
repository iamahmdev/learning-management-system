import { body, param } from "express-validator";

// Create Student Validation
export const createStudentValidation = [
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

  body("sectionId")
    .trim()
    .notEmpty()
    .withMessage("Section ID is required")
    .isMongoId()
    .withMessage("Invalid Section ID"),

  body("admissionNumber")
    .trim()
    .notEmpty()
    .withMessage("Admission number is required")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Admission number must be between 2 and 30 characters"
    )
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Admission number can only contain letters, numbers, hyphens and underscores"
    ),

  body("rollNumber")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Roll number cannot exceed 20 characters"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other"),

  body("bloodGroup")
    .optional()
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
      "unknown",
    ])
    .withMessage("Invalid blood group"),

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

  body("admissionDate")
    .notEmpty()
    .withMessage("Admission date is required")
    .isISO8601()
    .withMessage("Admission date must be a valid date"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "graduated", "transferred"])
    .withMessage(
      "Status must be active, inactive, graduated or transferred"
    ),
];

// Update Student Validation
export const updateStudentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Student ID"),

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

  body("sectionId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Section ID"),

  body("admissionNumber")
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "Admission number must be between 2 and 30 characters"
    )
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Admission number can only contain letters, numbers, hyphens and underscores"
    ),

  body("rollNumber")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Roll number cannot exceed 20 characters"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other"),

  body("bloodGroup")
    .optional()
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
      "unknown",
    ])
    .withMessage("Invalid blood group"),

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

  body("admissionDate")
    .optional()
    .isISO8601()
    .withMessage("Admission date must be a valid date"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "graduated", "transferred"])
    .withMessage(
      "Status must be active, inactive, graduated or transferred"
    ),
];

// Student ID Validation
export const studentIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Student ID"),
];
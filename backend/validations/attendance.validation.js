import { body, param } from "express-validator";

// =====================================================
// CREATE ATTENDANCE VALIDATION
// =====================================================

export const createAttendanceValidation = [
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

  body("studentId")
    .trim()
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("date")
    .notEmpty()
    .withMessage("Attendance date is required")
    .isISO8601()
    .withMessage("Invalid attendance date")
    .toDate(),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Attendance status is required")
    .isIn(["present", "absent", "late", "leave"])
    .withMessage(
      "Status must be present, absent, late, or leave"
    ),

  body("remarks")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters"),
];

// =====================================================
// UPDATE ATTENDANCE VALIDATION
// =====================================================

export const updateAttendanceValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Attendance ID"),

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

  body("studentId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Invalid attendance date")
    .toDate(),

  body("status")
    .optional()
    .trim()
    .isIn(["present", "absent", "late", "leave"])
    .withMessage(
      "Status must be present, absent, late, or leave"
    ),

  body("remarks")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Remarks cannot exceed 500 characters"),
];

// =====================================================
// ATTENDANCE ID VALIDATION
// =====================================================

export const attendanceIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Attendance ID"),
];
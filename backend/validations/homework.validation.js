import { body, param } from "express-validator";

// Create Homework Validation
export const createHomeworkValidation = [
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

  body("subjectId")
    .trim()
    .notEmpty()
    .withMessage("Subject ID is required")
    .isMongoId()
    .withMessage("Invalid Subject ID"),

  body("teacherId")
    .trim()
    .notEmpty()
    .withMessage("Teacher ID is required")
    .isMongoId()
    .withMessage("Invalid Teacher ID"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("assignedDate")
    .optional()
    .isISO8601()
    .withMessage("Assigned date must be a valid date"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("totalMarks")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total marks must be at least 1"),

  body("attachments").optional().isArray(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium or high"),

  body("status")
    .optional()
    .isIn(["active", "completed", "cancelled"])
    .withMessage("Status must be active, completed or cancelled"),
];

// Update Homework Validation
export const updateHomeworkValidation = [
  param("id").isMongoId().withMessage("Invalid Homework ID"),

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

  body("subjectId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Subject ID"),

  body("teacherId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid Teacher ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("assignedDate")
    .optional()
    .isISO8601()
    .withMessage("Assigned date must be a valid date"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("totalMarks")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total marks must be at least 1"),

  body("attachments").optional().isArray(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium or high"),

  body("status")
    .optional()
    .isIn(["active", "completed", "cancelled"])
    .withMessage("Status must be active, completed or cancelled"),
];

// Homework ID Validation
export const homeworkIdValidation = [
  param("id").isMongoId().withMessage("Invalid Homework ID"),
];

// Submit Homework Validation
export const submitHomeworkValidation = [
  param("id").isMongoId().withMessage("Invalid Homework ID"),

  body("studentId")
    .trim()
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("submissionText")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Submission text cannot exceed 5000 characters"),

  body("attachments").optional().isArray(),
];

// Grade Homework Validation
export const gradeHomeworkValidation = [
  param("id").isMongoId().withMessage("Invalid Submission ID"),

  body("marksObtained")
    .notEmpty()
    .withMessage("Marks obtained is required")
    .isFloat({ min: 0 })
    .withMessage("Marks obtained cannot be negative"),

  body("feedback")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Feedback cannot exceed 1000 characters"),

  body("gradedBy")
    .trim()
    .notEmpty()
    .withMessage("Graded by is required")
    .isMongoId()
    .withMessage("Invalid Teacher ID"),
];

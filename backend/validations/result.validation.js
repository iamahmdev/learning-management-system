import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

// Create Result Validation
export const createResultValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic year ID is required",
  }),

  examId: objectId.required().messages({
    "any.required": "Exam ID is required",
  }),

  studentId: objectId.required().messages({
    "any.required": "Student ID is required",
  }),

  subjectId: objectId.required().messages({
    "any.required": "Subject ID is required",
  }),

  marksObtained: Joi.number().min(0).required().messages({
    "any.required": "Marks obtained are required",
    "number.min": "Marks obtained cannot be negative",
  }),

  totalMarks: Joi.number().min(1).required().messages({
    "any.required": "Total marks are required",
    "number.min": "Total marks must be greater than 0",
  }),

  grade: Joi.string().trim().uppercase().max(5).allow("").optional(),

  percentage: Joi.number().min(0).max(100).optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  status: Joi.string()
    .valid("pass", "fail", "absent")
    .optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

// Update Result Validation
export const updateResultValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  examId: objectId.optional(),

  studentId: objectId.optional(),

  subjectId: objectId.optional(),

  marksObtained: Joi.number().min(0).optional(),

  totalMarks: Joi.number().min(1).optional(),

  grade: Joi.string().trim().uppercase().max(5).allow("").optional(),

  percentage: Joi.number().min(0).max(100).optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  status: Joi.string()
    .valid("pass", "fail", "absent")
    .optional(),

  updatedBy: objectId.optional(),
}).min(1);
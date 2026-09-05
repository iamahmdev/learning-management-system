import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

export const createExamValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic year ID is required",
  }),

  name: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Exam name is required",
    "string.empty": "Exam name is required",
  }),

  code: Joi.string().trim().uppercase().min(2).max(30).required().messages({
    "any.required": "Exam code is required",
    "string.empty": "Exam code is required",
  }),

  description: Joi.string().trim().max(500).allow("").optional(),

  examType: Joi.string()
    .valid(
      "monthly",
      "midterm",
      "final",
      "annual",
      "quiz",
      "assignment",
      "other"
    )
    .required()
    .messages({
      "any.only": "Invalid exam type",
      "any.required": "Exam type is required",
    }),

  startDate: Joi.date().required().messages({
    "any.required": "Start date is required",
    "date.base": "Start date must be a valid date",
  }),

  endDate: Joi.date().min(Joi.ref("startDate")).required().messages({
    "any.required": "End date is required",
    "date.base": "End date must be a valid date",
    "date.min": "End date cannot be earlier than start date",
  }),

  totalMarks: Joi.number().integer().min(1).required().messages({
    "any.required": "Total marks are required",
    "number.min": "Total marks must be greater than 0",
  }),

  passingMarks: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("totalMarks"))
    .required()
    .messages({
      "any.required": "Passing marks are required",
      "number.min": "Passing marks cannot be negative",
      "number.max": "Passing marks cannot be greater than total marks",
    }),

  status: Joi.string()
    .valid("draft", "scheduled", "ongoing", "completed", "cancelled")
    .optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

export const updateExamValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  name: Joi.string().trim().min(2).max(100).optional(),

  code: Joi.string().trim().uppercase().min(2).max(30).optional(),

  description: Joi.string().trim().max(500).allow("").optional(),

  examType: Joi.string()
    .valid(
      "monthly",
      "midterm",
      "final",
      "annual",
      "quiz",
      "assignment",
      "other"
    )
    .optional(),

  startDate: Joi.date().optional(),

  endDate: Joi.date().optional(),

  totalMarks: Joi.number().integer().min(1).optional(),

  passingMarks: Joi.number().integer().min(0).optional(),

  status: Joi.string()
    .valid("draft", "scheduled", "ongoing", "completed", "cancelled")
    .optional(),

  updatedBy: objectId.optional(),
}).min(1);
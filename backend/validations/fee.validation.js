import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

// Create Fee Validation
export const createFeeValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic Year ID is required",
  }),

  studentId: objectId.required().messages({
    "any.required": "Student ID is required",
  }),

  feeType: Joi.string()
    .valid(
      "tuition",
      "admission",
      "exam",
      "transport",
      "library",
      "lab",
      "sports",
      "other"
    )
    .required()
    .messages({
      "any.required": "Fee type is required",
      "any.only": "Invalid fee type",
    }),

  amount: Joi.number().min(0).required().messages({
    "any.required": "Fee amount is required",
    "number.min": "Fee amount cannot be negative",
  }),

  paidAmount: Joi.number().min(0).default(0).messages({
    "number.min": "Paid amount cannot be negative",
  }),

  dueDate: Joi.date().required().messages({
    "any.required": "Due date is required",
    "date.base": "Due date must be a valid date",
  }),

  paymentDate: Joi.date().allow(null).optional(),

  paymentMethod: Joi.string()
    .valid("cash", "bank", "online", "card", "other")
    .allow(null)
    .optional(),

  transactionId: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("pending", "partial", "paid", "overdue")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

// Update Fee Validation
export const updateFeeValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  studentId: objectId.optional(),

  feeType: Joi.string()
    .valid(
      "tuition",
      "admission",
      "exam",
      "transport",
      "library",
      "lab",
      "sports",
      "other"
    )
    .optional(),

  amount: Joi.number().min(0).optional(),

  paidAmount: Joi.number().min(0).optional(),

  dueDate: Joi.date().optional(),

  paymentDate: Joi.date().allow(null).optional(),

  paymentMethod: Joi.string()
    .valid("cash", "bank", "online", "card", "other")
    .allow(null)
    .optional(),

  transactionId: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("pending", "partial", "paid", "overdue")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  updatedBy: objectId.optional(),
}).min(1);
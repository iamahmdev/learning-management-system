import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

const salaryMonth = Joi.string()
  .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
  .messages({
    "string.pattern.base": "Salary month must be in YYYY-MM format",
  });

export const createPayrollValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic Year ID is required",
  }),

  employeeId: objectId.required().messages({
    "any.required": "Employee ID is required",
  }),

  salaryMonth: salaryMonth.required().messages({
    "any.required": "Salary month is required",
  }),

  basicSalary: Joi.number().min(0).required().messages({
    "any.required": "Basic salary is required",
    "number.min": "Basic salary cannot be negative",
  }),

  allowances: Joi.number().min(0).default(0),

  deductions: Joi.number().min(0).default(0),

  netSalary: Joi.number().min(0).optional(),

  paymentDate: Joi.date().allow(null).optional(),

  paymentMethod: Joi.string()
    .valid("cash", "bank", "online", "card", "other")
    .allow(null)
    .optional(),

  transactionId: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("pending", "paid", "cancelled")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

export const updatePayrollValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  employeeId: objectId.optional(),

  salaryMonth: salaryMonth.optional(),

  basicSalary: Joi.number().min(0).optional(),

  allowances: Joi.number().min(0).optional(),

  deductions: Joi.number().min(0).optional(),

  netSalary: Joi.number().min(0).optional(),

  paymentDate: Joi.date().allow(null).optional(),

  paymentMethod: Joi.string()
    .valid("cash", "bank", "online", "card", "other")
    .allow(null)
    .optional(),

  transactionId: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("pending", "paid", "cancelled")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  updatedBy: objectId.optional(),
}).min(1);
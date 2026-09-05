import Joi from "joi";

// =====================================================
// REGISTER USER VALIDATION
// =====================================================

export const registerUserValidation = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(100).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 100 characters",
    "any.required": "Password is required",
  }),
  role: Joi.string()
    .valid("admin", "teacher", "student", "parent", "staff")
    .required()
    .messages({
      "string.empty": "Role is required",
      "any.only": "Role must be one of: admin, teacher, student, parent, staff",
      "any.required": "Role is required",
    }),
  phone: Joi.string().trim().min(10).max(15).optional().allow("", null).messages({
    "string.min": "Phone number must be at least 10 digits",
    "string.max": "Phone number cannot exceed 15 digits",
  }),
  profile: Joi.string().trim().uri().optional().allow("", null).messages({
    "string.uri": "Profile must be a valid URL",
  }),
});

// =====================================================
// LOGIN USER VALIDATION
// =====================================================

export const loginUserValidation = Joi.object({
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

// =====================================================
// FORGOT PASSWORD VALIDATION
// =====================================================

export const forgotPasswordValidation = Joi.object({
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
});

// =====================================================
// RESET PASSWORD VALIDATION
// =====================================================

export const resetPasswordValidation = Joi.object({
  password: Joi.string().min(8).max(100).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 100 characters",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Confirm password is required",
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
});

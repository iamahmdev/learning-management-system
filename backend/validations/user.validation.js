import { body, param, validationResult } from "express-validator";

// =====================================================
// COMMON VALIDATION HANDLER
// =====================================================

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

// =====================================================
// REGISTER USER VALIDATION
// =====================================================

export const validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),

  body("role")
    .optional()
    .isIn([
      "student",
      "teacher",
      "parent",
      "staff",
    ])
    .withMessage("Invalid user role"),

  body("phone")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone number cannot exceed 30 characters"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Invalid user status"),

  handleValidationErrors,
];

// =====================================================
// LOGIN USER VALIDATION
// =====================================================

export const validateLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];

// =====================================================
// ADMIN LOGIN VALIDATION
// =====================================================

export const validateAdminLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Admin email is required")
    .isEmail()
    .withMessage("Please provide a valid admin email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Admin password is required"),

  handleValidationErrors,
];

// =====================================================
// FORGOT PASSWORD VALIDATION
// =====================================================

export const validateForgotPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  handleValidationErrors,
];

// =====================================================
// RESET PASSWORD VALIDATION
// =====================================================

export const validateResetPassword = [
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Password reset token is required")
    .isHexadecimal()
    .withMessage("Invalid password reset token"),

  body("password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  handleValidationErrors,
];

// =====================================================
// UPDATE USER VALIDATION
// =====================================================

export const validateUpdateUser = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone number cannot exceed 30 characters"),

  body("role")
    .optional()
    .isIn([
      "student",
      "teacher",
      "parent",
      "staff",
    ])
    .withMessage("Invalid user role"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Invalid user status"),

  body("password")
    .optional()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),

  handleValidationErrors,
];

// =====================================================
// USER ID VALIDATION
// =====================================================

export const validateUserId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID"),

  handleValidationErrors,
];
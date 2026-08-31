import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

const validateObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const validateObjectIdArray = (value) => {
  return Array.isArray(value) && value.every(id => mongoose.Types.ObjectId.isValid(id));
};

// =====================================================
// CREATE NOTIFICATION VALIDATION
// =====================================================

export const validateCreateNotification = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("senderId")
    .notEmpty()
    .withMessage("Sender ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid sender ID format"),

  body("receiverId")
    .notEmpty()
    .withMessage("Receiver ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid receiver ID format"),

  body("title")
    .notEmpty()
    .withMessage("Notification title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Notification title must be between 3 and 200 characters")
    .trim(),

  body("message")
    .notEmpty()
    .withMessage("Notification message is required")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Notification message must be between 5 and 1000 characters")
    .trim(),

  body("type")
    .optional()
    .isIn([
      "general",
      "assignment",
      "exam",
      "result",
      "attendance",
      "fee",
      "event",
      "announcement",
      "reminder",
      "alert",
      "warning",
      "system",
    ])
    .withMessage("Invalid notification type"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  body("actionUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Action URL cannot exceed 500 characters")
    .trim(),

  body("metadata")
    .optional()
    .isObject()
    .withMessage("Metadata must be an object"),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid expiration date format")
    .toDate(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  body("deliveryMethod")
    .optional()
    .isArray()
    .withMessage("Delivery method must be an array")
    .custom((value) => {
      const validMethods = ["in-app", "email", "sms", "push"];
      return value.every(method => validMethods.includes(method));
    })
    .withMessage("Invalid delivery method"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// BULK CREATE NOTIFICATIONS VALIDATION
// =====================================================

export const validateBulkCreateNotification = [
  body("schoolId")
    .notEmpty()
    .withMessage("School ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  body("senderId")
    .notEmpty()
    .withMessage("Sender ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid sender ID format"),

  body("receiverIds")
    .notEmpty()
    .withMessage("Receiver IDs are required")
    .isArray({ min: 1 })
    .withMessage("Receiver IDs must be a non-empty array")
    .custom(validateObjectIdArray)
    .withMessage("All receiver IDs must be valid ObjectId format"),

  body("title")
    .notEmpty()
    .withMessage("Notification title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Notification title must be between 3 and 200 characters")
    .trim(),

  body("message")
    .notEmpty()
    .withMessage("Notification message is required")
    .isLength({ min: 5, max: 1000 })
    .withMessage("Notification message must be between 5 and 1000 characters")
    .trim(),

  body("type")
    .optional()
    .isIn([
      "general",
      "assignment",
      "exam",
      "result",
      "attendance",
      "fee",
      "event",
      "announcement",
      "reminder",
      "alert",
      "warning",
      "system",
    ])
    .withMessage("Invalid notification type"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  body("actionUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Action URL cannot exceed 500 characters")
    .trim(),

  body("metadata")
    .optional()
    .isObject()
    .withMessage("Metadata must be an object"),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid expiration date format")
    .toDate(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  body("deliveryMethod")
    .optional()
    .isArray()
    .withMessage("Delivery method must be an array")
    .custom((value) => {
      const validMethods = ["in-app", "email", "sms", "push"];
      return value.every(method => validMethods.includes(method));
    })
    .withMessage("Invalid delivery method"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// UPDATE NOTIFICATION VALIDATION
// =====================================================

export const validateUpdateNotification = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Notification title must be between 3 and 200 characters")
    .trim(),

  body("message")
    .optional()
    .isLength({ min: 5, max: 1000 })
    .withMessage("Notification message must be between 5 and 1000 characters")
    .trim(),

  body("type")
    .optional()
    .isIn([
      "general",
      "assignment",
      "exam",
      "result",
      "attendance",
      "fee",
      "event",
      "announcement",
      "reminder",
      "alert",
      "warning",
      "system",
    ])
    .withMessage("Invalid notification type"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  body("actionUrl")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Action URL cannot exceed 500 characters")
    .trim(),

  body("metadata")
    .optional()
    .isObject()
    .withMessage("Metadata must be an object"),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid expiration date format")
    .toDate(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  body("deliveryMethod")
    .optional()
    .isArray()
    .withMessage("Delivery method must be an array")
    .custom((value) => {
      const validMethods = ["in-app", "email", "sms", "push"];
      return value.every(method => validMethods.includes(method));
    })
    .withMessage("Invalid delivery method"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// NOTIFICATION ID VALIDATION
// =====================================================

export const validateNotificationId = [
  param("id")
    .custom(validateObjectId)
    .withMessage("Invalid notification ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// NOTIFICATION QUERY VALIDATION
// =====================================================

export const validateNotificationQuery = [
  query("schoolId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid school ID format"),

  query("receiverId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid receiver ID format"),

  query("senderId")
    .optional()
    .custom(validateObjectId)
    .withMessage("Invalid sender ID format"),

  query("type")
    .optional()
    .isIn([
      "general",
      "assignment",
      "exam",
      "result",
      "attendance",
      "fee",
      "event",
      "announcement",
      "reminder",
      "alert",
      "warning",
      "system",
    ])
    .withMessage("Invalid notification type"),

  query("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  query("isRead")
    .optional()
    .isIn(['true', 'false'])
    .withMessage("isRead must be true or false"),

  query("isActive")
    .optional()
    .isIn(['true', 'false'])
    .withMessage("isActive must be true or false"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// MARK ALL AS READ VALIDATION
// =====================================================

export const validateMarkAllAsRead = [
  body("receiverId")
    .notEmpty()
    .withMessage("Receiver ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid receiver ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

// =====================================================
// UNREAD COUNT VALIDATION
// =====================================================

export const validateUnreadCount = [
  query("receiverId")
    .notEmpty()
    .withMessage("Receiver ID is required")
    .custom(validateObjectId)
    .withMessage("Invalid receiver ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
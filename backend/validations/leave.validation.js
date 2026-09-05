import { body, param } from "express-validator";

export const createLeaveValidation = [
  body("schoolId").trim().notEmpty().withMessage("School ID is required").isMongoId().withMessage("Invalid School ID"),
  body("userId").trim().notEmpty().withMessage("User ID is required").isMongoId().withMessage("Invalid User ID"),
  body("userType").notEmpty().withMessage("User type is required").isIn(["student", "teacher", "staff"]).withMessage("Invalid user type"),
  body("leaveType").notEmpty().withMessage("Leave type is required").isIn(["sick", "casual", "emergency", "vacation", "maternity", "other"]).withMessage("Invalid leave type"),
  body("startDate").notEmpty().withMessage("Start date is required").isISO8601().withMessage("Invalid start date"),
  body("endDate").notEmpty().withMessage("End date is required").isISO8601().withMessage("Invalid end date"),
  body("totalDays").notEmpty().withMessage("Total days is required").isInt({ min: 1 }).withMessage("Total days must be at least 1"),
  body("reason").trim().notEmpty().withMessage("Reason is required").isLength({ max: 1000 }).withMessage("Reason cannot exceed 1000 characters"),
  body("attachments").optional().isArray(),
];

export const updateLeaveValidation = [
  param("id").isMongoId().withMessage("Invalid Leave ID"),
  body("status").optional().isIn(["pending", "approved", "rejected", "cancelled"]).withMessage("Invalid status"),
  body("approvedBy").optional().isMongoId().withMessage("Invalid approver ID"),
  body("rejectionReason").optional().trim().isLength({ max: 500 }).withMessage("Rejection reason cannot exceed 500 characters"),
  body("remarks").optional().trim().isLength({ max: 500 }).withMessage("Remarks cannot exceed 500 characters"),
];

export const leaveIdValidation = [
  param("id").isMongoId().withMessage("Invalid Leave ID"),
];

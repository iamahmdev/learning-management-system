import express from "express";

import {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  updateLeaveStatus,
  cancelLeave,
  deleteLeave,
} from "../controllers/leave.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateLeave,
  validateUpdateLeaveStatus,
  validateLeaveId,
} from "../validations/leave.validation.js";

const router = express.Router();

// Create Leave Application
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("student", "teacher", "staff", "parent"),
  validateCreateLeave,
  createLeave
);

// Get All Leaves
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff", "parent"),
  getAllLeaves
);

// Approve/Reject Leave
router.post(
  "/:id/status",
  isAuthenticated,
  authorizeRoles("admin"),
  validateLeaveId,
  validateUpdateLeaveStatus,
  updateLeaveStatus
);

// Cancel Leave
router.post(
  "/:id/cancel",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff", "parent"),
  validateLeaveId,
  cancelLeave
);

// Get Leave by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff", "parent"),
  validateLeaveId,
  getLeaveById
);

// Update Leave
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff", "parent"),
  validateLeaveId,
  updateLeave
);

// Delete Leave
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateLeaveId,
  deleteLeave
);

export default router;
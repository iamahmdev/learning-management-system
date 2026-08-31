import express from "express";

import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentStatistics,
} from "../controllers/assignment.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateAssignment,
  validateUpdateAssignment,
  validateAssignmentId,
  validateAssignmentQuery,
} from "../validations/assignment.validation.js";

const router = express.Router();

// =====================================================
// ASSIGNMENT ROUTES
// =====================================================

// Create Assignment
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateCreateAssignment,
  createAssignment
);

// Get All Assignments
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateAssignmentQuery,
  getAllAssignments
);

// Get Assignment Statistics
router.get(
  "/:id/statistics",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateAssignmentId,
  getAssignmentStatistics
);

// Get Assignment by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateAssignmentId,
  getAssignmentById
);

// Update Assignment
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateAssignmentId,
  validateUpdateAssignment,
  updateAssignment
);

// Delete Assignment
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateAssignmentId,
  deleteAssignment
);

export default router;
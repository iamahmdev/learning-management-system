import express from "express";

import {
  submitAssignment,
  getAllSubmissions,
  getSubmissionById,
  gradeSubmission,
  updateSubmission,
  deleteSubmission,
} from "../controllers/assignmentSubmission.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateSubmitAssignment,
  validateGradeSubmission,
  validateUpdateSubmission,
  validateSubmissionId,
  validateSubmissionQuery,
} from "../validations/assignmentSubmission.validation.js";

const router = express.Router();

// =====================================================
// ASSIGNMENT SUBMISSION ROUTES
// =====================================================

// Submit Assignment
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("student"),
  validateSubmitAssignment,
  submitAssignment
);

// Get All Submissions
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateSubmissionQuery,
  getAllSubmissions
);

// Grade Assignment Submission
router.post(
  "/:id/grade",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateSubmissionId,
  validateGradeSubmission,
  gradeSubmission
);

// Get Submission by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateSubmissionId,
  getSubmissionById
);

// Update Submission
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student"),
  validateSubmissionId,
  validateUpdateSubmission,
  updateSubmission
);

// Delete Submission
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student"),
  validateSubmissionId,
  deleteSubmission
);

export default router;
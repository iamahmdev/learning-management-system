import express from "express";

import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controllers/exam.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateExam,
  validateUpdateExam,
} from "../validations/exam.validation.js";

const router = express.Router();

// =====================================================
// EXAM MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Exam
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateExam,
  createExam
);

// Get All Exams
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllExams
);

// Get Exam By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getExamById
);

// Update Exam
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateExam,
  updateExam
);

// Delete Exam
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteExam
);

export default router;
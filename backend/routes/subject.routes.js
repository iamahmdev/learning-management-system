import express from "express";

import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateSubject,
  validateUpdateSubject,
} from "../validations/subject.validation.js";

const router = express.Router();

// =====================================================
// SUBJECT MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Subject
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateSubject,
  createSubject
);

// Get All Subjects
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllSubjects
);

// Get Subject By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getSubjectById
);

// Update Subject
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateSubject,
  updateSubject
);

// Delete Subject
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteSubject
);

export default router;
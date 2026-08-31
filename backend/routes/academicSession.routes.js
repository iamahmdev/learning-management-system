import express from "express";

import {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} from "../controllers/academicSession.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateAcademicYear,
  validateUpdateAcademicYear,
} from "../validations/academicYear.validation.js";

const router = express.Router();

// =====================================================
// ACADEMIC SESSION MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Academic Session
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateAcademicYear,
  createAcademicSession
);

// Get All Academic Sessions
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllAcademicSessions
);

// Get Academic Session By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getAcademicSessionById
);

// Update Academic Session
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateAcademicYear,
  updateAcademicSession
);

// Delete Academic Session
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteAcademicSession
);

export default router;
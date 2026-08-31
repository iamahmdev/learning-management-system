import express from "express";

import {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from "../controllers/school.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateSchool,
  validateUpdateSchool,
  validateSchoolId,
} from "../validations/school.validation.js";

const router = express.Router();

// =====================================================
// SCHOOL MANAGEMENT - ADMIN ONLY
// =====================================================

// Create School
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateSchool,
  createSchool
);

// Get All Schools
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllSchools
);

// Get School By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateSchoolId,
  getSchoolById
);

// Update School
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateSchoolId,
  validateUpdateSchool,
  updateSchool
);

// Delete School
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateSchoolId,
  deleteSchool
);

export default router;
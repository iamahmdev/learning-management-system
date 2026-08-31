import express from "express";

import {
  getSchoolDashboard,
  getStudentDashboard,
  getTeacherDashboard,
} from "../controllers/dashboard.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateSchoolDashboard,
  validateStudentDashboard,
  validateTeacherDashboard,
} from "../validations/dashboard.validation.js";

const router = express.Router();

// =====================================================
// DASHBOARD ROUTES
// =====================================================

// School Dashboard
router.get(
  "/school",
  isAuthenticated,
  authorizeRoles("admin"),
  validateSchoolDashboard,
  getSchoolDashboard
);

// Student Dashboard
router.get(
  "/student",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateStudentDashboard,
  getStudentDashboard
);

// Teacher Dashboard
router.get(
  "/teacher",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateTeacherDashboard,
  getTeacherDashboard
);

export default router;
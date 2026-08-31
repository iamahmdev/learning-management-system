import express from "express";

import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateAttendance,
  validateUpdateAttendance,
} from "../validations/attendance.validation.js";

const router = express.Router();

// =====================================================
// ATTENDANCE MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Attendance
// POST /api/attendance
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateAttendance,
  createAttendance
);

// Get All Attendance
// GET /api/attendance
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllAttendance
);

// Get Attendance By ID
// GET /api/attendance/:id
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getAttendanceById
);

// Update Attendance
// PUT /api/attendance/:id
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateAttendance,
  updateAttendance
);

// Delete Attendance
// DELETE /api/attendance/:id
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteAttendance
);

export default router;
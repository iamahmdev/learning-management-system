import express from "express";

import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendance.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createAttendanceValidation,
  updateAttendanceValidation,
  attendanceIdValidation,
} from "../validations/attendance.validation.js";

const router = express.Router();

// =====================================================
// CREATE ATTENDANCE
// POST /api/attendance
// =====================================================

router.post(
  "/",
  isAuthenticated,
  createAttendanceValidation,
  validate,
  createAttendance
);

// =====================================================
// GET ALL ATTENDANCE
// GET /api/attendance
// =====================================================

router.get(
  "/",
  isAuthenticated,
  getAllAttendance
);

// =====================================================
// GET ATTENDANCE BY ID
// GET /api/attendance/:id
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  attendanceIdValidation,
  validate,
  getAttendanceById
);

// =====================================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  updateAttendanceValidation,
  validate,
  updateAttendance
);

// =====================================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  attendanceIdValidation,
  validate,
  deleteAttendance
);

export default router;
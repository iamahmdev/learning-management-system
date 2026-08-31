import express from "express";

import {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
  getWeeklyTimetable,
} from "../controllers/timetable.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateTimetable,
  validateUpdateTimetable,
  validateTimetableId,
  validateTimetableQuery,
  validateWeeklyTimetable,
} from "../validations/timetable.validation.js";

const router = express.Router();

// =====================================================
// TIMETABLE ROUTES
// =====================================================

// Create Timetable Entry
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateCreateTimetable,
  createTimetable
);

// Get All Timetables
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateTimetableQuery,
  getAllTimetables
);

// Get Weekly Timetable
router.get(
  "/weekly",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateWeeklyTimetable,
  getWeeklyTimetable
);

// Get Timetable by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent"),
  validateTimetableId,
  getTimetableById
);

// Update Timetable
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateTimetableId,
  validateUpdateTimetable,
  updateTimetable
);

// Delete Timetable
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateTimetableId,
  deleteTimetable
);

export default router;
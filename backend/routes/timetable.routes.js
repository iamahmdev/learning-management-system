import express from "express";

import {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
} from "../controllers/timetable.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Timetable
router.post("/", isAuthenticated, createTimetable);

// Get All Timetables
router.get("/", isAuthenticated, getAllTimetables);

// Get Timetable By ID
router.get("/:id", isAuthenticated, getTimetableById);

// Update Timetable
router.put("/:id", isAuthenticated, updateTimetable);

// Delete Timetable
router.delete("/:id", isAuthenticated, deleteTimetable);

export default router;
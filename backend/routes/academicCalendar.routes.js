import express from "express";

import {
  createAcademicCalendar,
  getAllAcademicCalendars,
  getAcademicCalendarById,
  updateAcademicCalendar,
  deleteAcademicCalendar,
} from "../controllers/academicCalendar.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE ACADEMIC CALENDAR
router.post("/", isAuthenticated, createAcademicCalendar);

// GET ALL ACADEMIC CALENDARS
router.get("/", isAuthenticated, getAllAcademicCalendars);

// GET ACADEMIC CALENDAR BY ID
router.get("/:id", isAuthenticated, getAcademicCalendarById);

// UPDATE ACADEMIC CALENDAR
router.put("/:id", isAuthenticated, updateAcademicCalendar);

// DELETE ACADEMIC CALENDAR
router.delete("/:id", isAuthenticated, deleteAcademicCalendar);

export default router;

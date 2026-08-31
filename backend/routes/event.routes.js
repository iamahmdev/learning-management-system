import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateEvent,
  validateEventId,
} from "../validations/event.validation.js";

const router = express.Router();

// Create Event
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateCreateEvent,
  createEvent
);

// Get All Events
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  getAllEvents
);

// Get Event by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateEventId,
  getEventById
);

// Update Event
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateEventId,
  updateEvent
);

// Delete Event
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateEventId,
  deleteEvent
);

export default router;
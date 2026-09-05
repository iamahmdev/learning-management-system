import express from "express";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createEventValidation, updateEventValidation, eventIdValidation } from "../validations/event.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createEventValidation, validate, createEvent);
router.get("/", isAuthenticated, getAllEvents);
router.get("/:id", isAuthenticated, eventIdValidation, validate, getEventById);
router.put("/:id", isAuthenticated, updateEventValidation, validate, updateEvent);
router.delete("/:id", isAuthenticated, eventIdValidation, validate, deleteEvent);

export default router;

import express from "express";
import { createNotification, getAllNotifications, markAsRead, deleteNotification } from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createNotificationValidation, notificationIdValidation } from "../validations/notification.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createNotificationValidation, validate, createNotification);
router.get("/", isAuthenticated, getAllNotifications);
router.put("/:id/read", isAuthenticated, notificationIdValidation, validate, markAsRead);
router.delete("/:id", isAuthenticated, notificationIdValidation, validate, deleteNotification);

export default router;

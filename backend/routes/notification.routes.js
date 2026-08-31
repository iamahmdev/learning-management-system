import express from "express";

import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  updateNotification,
  deleteNotification,
  bulkCreateNotifications,
} from "../controllers/notification.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateNotification,
  validateBulkCreateNotification,
  validateUpdateNotification,
  validateNotificationId,
  validateNotificationQuery,
  validateMarkAllAsRead,
  validateUnreadCount,
} from "../validations/notification.validation.js";

const router = express.Router();

// =====================================================
// NOTIFICATION ROUTES
// =====================================================

// Create Notification
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateCreateNotification,
  createNotification
);

// Bulk Create Notifications
router.post(
  "/bulk",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateBulkCreateNotification,
  bulkCreateNotifications
);

// Get All Notifications
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateNotificationQuery,
  getAllNotifications
);

// Get Unread Count
router.get(
  "/unread-count",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateUnreadCount,
  getUnreadCount
);

// Mark All As Read
router.post(
  "/mark-all-read",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateMarkAllAsRead,
  markAllAsRead
);

// Mark Notification As Read
router.post(
  "/:id/read",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateNotificationId,
  markAsRead
);

// Get Notification by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "parent", "staff"),
  validateNotificationId,
  getNotificationById
);

// Update Notification
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  validateNotificationId,
  validateUpdateNotification,
  updateNotification
);

// Delete Notification
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateNotificationId,
  deleteNotification
);

export default router;
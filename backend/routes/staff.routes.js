import express from "express";

import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateStaff,
  validateStaffId,
} from "../validations/staff.validation.js";

const router = express.Router();

// Create Staff
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateStaff,
  createStaff
);

// Get All Staff
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  getAllStaff
);

// Get Staff by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateStaffId,
  getStaffById
);

// Update Staff
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateStaffId,
  updateStaff
);

// Delete Staff
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateStaffId,
  deleteStaff
);

export default router;
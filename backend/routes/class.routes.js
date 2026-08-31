import express from "express";

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateClass,
  validateUpdateClass,
  validateClassId,
} from "../validations/class.validation.js";

const router = express.Router();

// =====================================================
// CLASS MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Class
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateClass,
  createClass
);

// Get All Classes
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllClasses
);

// Get Class By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateClassId,
  getClassById
);

// Update Class
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateClassId,
  validateUpdateClass,
  updateClass
);

// Delete Class
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateClassId,
  deleteClass
);

export default router;
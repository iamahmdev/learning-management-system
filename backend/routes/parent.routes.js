import express from "express";

import {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
} from "../controllers/parent.controller.js";

import {
  validateCreateParent,
  validateUpdateParent,
  validateParentId,
} from "../validations/parent.validation.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// =====================================================
// PARENT MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Parent
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateParent,
  createParent
);

// Get All Parents
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllParents
);

// Get Parent By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateParentId,
  getParentById
);

// Update Parent
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateParent,
  updateParent
);

// Delete Parent
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateParentId,
  deleteParent
);

export default router;
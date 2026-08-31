import express from "express";

import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// =====================================================
// SECTION MANAGEMENT - ADMIN ONLY
// =====================================================

// Create Section
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  createSection
);

// Get All Sections
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllSections
);

// Get Section By ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getSectionById
);

// Update Section
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateSection
);

// Delete Section
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteSection
);

export default router;
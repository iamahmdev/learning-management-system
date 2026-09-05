import express from "express";

import {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
} from "../controllers/parent.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createParentValidation,
  updateParentValidation,
  parentIdValidation,
} from "../validations/parent.validation.js";

const router = express.Router();

// =====================================================
// CREATE PARENT
// POST /api/parents
// =====================================================
router.post(
  "/",
  isAuthenticated,
  createParentValidation,
  validate,
  createParent
);

// =====================================================
// GET ALL PARENTS
// GET /api/parents
// =====================================================
router.get(
  "/",
  isAuthenticated,
  getAllParents
);

// =====================================================
// GET PARENT BY ID
// GET /api/parents/:id
// =====================================================
router.get(
  "/:id",
  isAuthenticated,
  parentIdValidation,
  validate,
  getParentById
);

// =====================================================
// UPDATE PARENT
// PUT /api/parents/:id
// =====================================================
router.put(
  "/:id",
  isAuthenticated,
  updateParentValidation,
  validate,
  updateParent
);

// =====================================================
// DELETE PARENT
// DELETE /api/parents/:id
// =====================================================
router.delete(
  "/:id",
  isAuthenticated,
  parentIdValidation,
  validate,
  deleteParent
);

export default router;
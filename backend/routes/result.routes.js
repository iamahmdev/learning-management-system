import express from "express";

import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/result.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import {
  validateCreateResult,
  validateUpdateResult,
} from "../validations/result.validation.js";

const router = express.Router();

// Create Result
router.post(
  "/",
  isAuthenticated,
  validateCreateResult,
  createResult
);

// Get All Results
router.get(
  "/",
  isAuthenticated,
  getAllResults
);

// Get Result By ID
router.get(
  "/:id",
  isAuthenticated,
  getResultById
);

// Update Result
router.put(
  "/:id",
  isAuthenticated,
  validateUpdateResult,
  updateResult
);

// Delete Result
router.delete(
  "/:id",
  isAuthenticated,
  deleteResult
);

export default router;
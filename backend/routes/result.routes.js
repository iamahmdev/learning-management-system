import express from "express";

import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/result.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Result
router.post("/", isAuthenticated, createResult);

// Get All Results
router.get("/", isAuthenticated, getAllResults);

// Get Single Result
router.get("/:id", isAuthenticated, getResultById);

// Update Result
router.put("/:id", isAuthenticated, updateResult);

// Delete Result
router.delete("/:id", isAuthenticated, deleteResult);

export default router;
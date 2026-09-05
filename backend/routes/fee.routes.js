import express from "express";

import {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
} from "../controllers/fee.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Fee
router.post("/", isAuthenticated, createFee);

// Get All Fees
router.get("/", isAuthenticated, getAllFees);

// Get Fee By ID
router.get("/:id", isAuthenticated, getFeeById);

// Update Fee
router.put("/:id", isAuthenticated, updateFee);

// Delete Fee
router.delete("/:id", isAuthenticated, deleteFee);

export default router;
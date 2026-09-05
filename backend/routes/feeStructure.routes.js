import express from "express";

import {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructureById,
  updateFeeStructure,
  deleteFeeStructure,
} from "../controllers/feeStructure.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE FEE STRUCTURE
router.post("/", isAuthenticated, createFeeStructure);

// GET ALL FEE STRUCTURES
router.get("/", isAuthenticated, getAllFeeStructures);

// GET FEE STRUCTURE BY ID
router.get("/:id", isAuthenticated, getFeeStructureById);

// UPDATE FEE STRUCTURE
router.put("/:id", isAuthenticated, updateFeeStructure);

// DELETE FEE STRUCTURE
router.delete("/:id", isAuthenticated, deleteFeeStructure);

export default router;

import express from "express";

import {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
} from "../controllers/payroll.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Payroll
router.post("/", isAuthenticated, createPayroll);

// Get All Payrolls
router.get("/", isAuthenticated, getAllPayrolls);

// Get Payroll By ID
router.get("/:id", isAuthenticated, getPayrollById);

// Update Payroll
router.put("/:id", isAuthenticated, updatePayroll);

// Delete Payroll
router.delete("/:id", isAuthenticated, deletePayroll);

export default router;
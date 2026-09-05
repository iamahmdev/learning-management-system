import express from "express";
import { createBudget, getAllBudgets, getBudgetById, updateBudget, deleteBudget } from "../controllers/budget.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createBudget);
router.get("/", isAuthenticated, getAllBudgets);
router.get("/:id", isAuthenticated, getBudgetById);
router.put("/:id", isAuthenticated, updateBudget);
router.delete("/:id", isAuthenticated, deleteBudget);

export default router;

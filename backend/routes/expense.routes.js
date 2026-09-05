import express from "express";
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from "../controllers/expense.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createExpense);
router.get("/", isAuthenticated, getAllExpenses);
router.get("/:id", isAuthenticated, getExpenseById);
router.put("/:id", isAuthenticated, updateExpense);
router.delete("/:id", isAuthenticated, deleteExpense);

export default router;

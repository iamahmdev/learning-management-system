import express from "express";
import { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion } from "../controllers/questionBank.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createQuestion);
router.get("/", isAuthenticated, getAllQuestions);
router.get("/:id", isAuthenticated, getQuestionById);
router.put("/:id", isAuthenticated, updateQuestion);
router.delete("/:id", isAuthenticated, deleteQuestion);

export default router;

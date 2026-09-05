import express from "express";

import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controllers/exam.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
const router = express.Router();

// Create Exam
router.post("/", isAuthenticated, createExam);

// Get All Exams
router.get("/", isAuthenticated, getAllExams);

// Get Single Exam
router.get("/:id", isAuthenticated, getExamById);

// Update Exam
router.put("/:id", isAuthenticated, updateExam);

// Delete Exam
router.delete("/:id", isAuthenticated, deleteExam);

export default router;
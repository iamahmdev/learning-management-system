import express from "express";
import {
  createHomework,
  getAllHomework,
  getHomeworkById,
  updateHomework,
  deleteHomework,
  submitHomework,
  gradeHomeworkSubmission,
  getAllSubmissions,
} from "../controllers/homework.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createHomeworkValidation,
  updateHomeworkValidation,
  homeworkIdValidation,
  submitHomeworkValidation,
  gradeHomeworkValidation,
} from "../validations/homework.validation.js";

const router = express.Router();

// Homework CRUD
router.post("/", isAuthenticated, createHomeworkValidation, validate, createHomework);
router.get("/", isAuthenticated, getAllHomework);
router.get("/:id", isAuthenticated, homeworkIdValidation, validate, getHomeworkById);
router.put("/:id", isAuthenticated, updateHomeworkValidation, validate, updateHomework);
router.delete("/:id", isAuthenticated, homeworkIdValidation, validate, deleteHomework);

// Homework Submission
router.post("/:id/submit", isAuthenticated, submitHomeworkValidation, validate, submitHomework);
router.put("/submissions/:id/grade", isAuthenticated, gradeHomeworkValidation, validate, gradeHomeworkSubmission);
router.get("/submissions/all", isAuthenticated, getAllSubmissions);

export default router;

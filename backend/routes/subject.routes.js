import express from "express";

import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createSubjectValidation,
  updateSubjectValidation,
  subjectIdValidation,
} from "../validations/subject.validation.js";

const router = express.Router();

// Create Subject
router.post(
  "/",
  isAuthenticated,
  createSubjectValidation,
  validate,
  createSubject
);

// Get All Subjects
router.get(
  "/",
  isAuthenticated,
  getAllSubjects
);

// Get Subject By ID
router.get(
  "/:id",
  isAuthenticated,
  subjectIdValidation,
  validate,
  getSubjectById
);

// Update Subject
router.put(
  "/:id",
  isAuthenticated,
  updateSubjectValidation,
  validate,
  updateSubject
);

// Delete Subject
router.delete(
  "/:id",
  isAuthenticated,
  subjectIdValidation,
  validate,
  deleteSubject
);

export default router;
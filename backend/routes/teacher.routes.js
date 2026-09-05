import express from "express";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createTeacherValidation,
  updateTeacherValidation,
  teacherIdValidation,
} from "../validations/teacher.validation.js";

const router = express.Router();

// Create Teacher
router.post(
  "/",
  isAuthenticated,
  createTeacherValidation,
  validate,
  createTeacher
);

// Get All Teachers
router.get(
  "/",
  isAuthenticated,
  getAllTeachers
);

// Get Teacher By ID
router.get(
  "/:id",
  isAuthenticated,
  teacherIdValidation,
  validate,
  getTeacherById
);

// Update Teacher
router.put(
  "/:id",
  isAuthenticated,
  updateTeacherValidation,
  validate,
  updateTeacher
);

// Delete Teacher
router.delete(
  "/:id",
  isAuthenticated,
  teacherIdValidation,
  validate,
  deleteTeacher
);

export default router;
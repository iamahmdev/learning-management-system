import express from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createStudentValidation,
  updateStudentValidation,
  studentIdValidation,
} from "../validations/student.validation.js";

const router = express.Router();

// =====================================================
// CREATE STUDENT
// POST /api/students
// =====================================================
router.post(
  "/",
  isAuthenticated,
  createStudentValidation,
  validate,
  createStudent
);

// =====================================================
// GET ALL STUDENTS
// GET /api/students
// =====================================================
router.get(
  "/",
  isAuthenticated,
  getAllStudents
);

// =====================================================
// GET STUDENT BY ID
// GET /api/students/:id
// =====================================================
router.get(
  "/:id",
  isAuthenticated,
  studentIdValidation,
  validate,
  getStudentById
);

// =====================================================
// UPDATE STUDENT
// PUT /api/students/:id
// =====================================================
router.put(
  "/:id",
  isAuthenticated,
  updateStudentValidation,
  validate,
  updateStudent
);

// =====================================================
// DELETE STUDENT
// DELETE /api/students/:id
// =====================================================
router.delete(
  "/:id",
  isAuthenticated,
  studentIdValidation,
  validate,
  deleteStudent
);

export default router;
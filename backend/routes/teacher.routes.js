import express from "express";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateTeacher,
  validateUpdateTeacher,
  validateTeacherId,
} from "../validations/teacher.validation.js";

const router = express.Router();

// =====================================================
// TEACHER MANAGEMENT - ADMIN ONLY
// =====================================================

// =====================================================
// CREATE TEACHER
// POST /api/teachers
// =====================================================

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateTeacher,
  createTeacher
);

// =====================================================
// GET ALL TEACHERS
// GET /api/teachers
// =====================================================

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllTeachers
);

// =====================================================
// GET TEACHER BY ID
// GET /api/teachers/:id
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateTeacherId,
  getTeacherById
);

// =====================================================
// UPDATE TEACHER
// PUT /api/teachers/:id
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateTeacher,
  updateTeacher
);

// =====================================================
// DELETE TEACHER
// DELETE /api/teachers/:id
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateTeacherId,
  deleteTeacher
);

export default router;
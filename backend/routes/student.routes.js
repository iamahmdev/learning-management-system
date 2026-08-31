import express from "express";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByAdmissionNumber,
  getStudentsByClass,
  getStudentsBySection,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateStudent,
  validateUpdateStudent,
  validateStudentId,
} from "../validations/student.validation.js";

const router = express.Router();

// =====================================================
// STUDENT MANAGEMENT
// ADMIN ONLY
// =====================================================

// =====================================================
// CREATE STUDENT
// =====================================================

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  validateCreateStudent,
  createStudent
);

// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllStudents
);

// =====================================================
// GET STUDENT BY ADMISSION NUMBER
// =====================================================

router.get(
  "/admission/:admissionNumber",
  isAuthenticated,
  authorizeRoles("admin"),
  getStudentByAdmissionNumber
);

// =====================================================
// GET STUDENTS BY CLASS
// =====================================================

router.get(
  "/class/:classId",
  isAuthenticated,
  authorizeRoles("admin"),
  getStudentsByClass
);

// =====================================================
// GET STUDENTS BY SECTION
// =====================================================

router.get(
  "/section/:sectionId",
  isAuthenticated,
  authorizeRoles("admin"),
  getStudentsBySection
);

// =====================================================
// GET STUDENT BY ID
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateStudentId,
  getStudentById
);

// =====================================================
// UPDATE STUDENT
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateStudentId,
  validateUpdateStudent,
  updateStudent
);

// =====================================================
// DELETE STUDENT
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateStudentId,
  deleteStudent
);

export default router;
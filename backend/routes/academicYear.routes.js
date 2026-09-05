import express from "express";

import {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
} from "../controllers/academicYear.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createAcademicYearValidation,
  updateAcademicYearValidation,
  academicYearIdValidation,
} from "../validations/academicYear.validation.js";

const router = express.Router();

// =====================================================
// CREATE ACADEMIC YEAR
// =====================================================

router.post(
  "/",
  isAuthenticated,
  createAcademicYearValidation,
  validate,
  createAcademicYear
);

// =====================================================
// GET ALL ACADEMIC YEARS
// =====================================================

router.get(
  "/",
  isAuthenticated,
  getAllAcademicYears
);

// =====================================================
// GET ACADEMIC YEAR BY ID
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  academicYearIdValidation,
  validate,
  getAcademicYearById
);

// =====================================================
// UPDATE ACADEMIC YEAR
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  updateAcademicYearValidation,
  validate,
  updateAcademicYear
);

// =====================================================
// DELETE ACADEMIC YEAR
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  academicYearIdValidation,
  validate,
  deleteAcademicYear
);

export default router;
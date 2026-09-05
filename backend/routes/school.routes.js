import express from "express";

import {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from "../controllers/school.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createSchoolValidation,
  updateSchoolValidation,
  schoolIdValidation,
} from "../validations/school.validation.js";

const router = express.Router();

// =====================================================
// CREATE SCHOOL
// =====================================================

router.post(
  "/",
  isAuthenticated,
  createSchoolValidation,
  validate,
  createSchool
);

// =====================================================
// GET ALL SCHOOLS
// =====================================================

router.get(
  "/",
  isAuthenticated,
  getAllSchools
);

// =====================================================
// GET SCHOOL BY ID
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  schoolIdValidation,
  validate,
  getSchoolById
);

// =====================================================
// UPDATE SCHOOL
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  updateSchoolValidation,
  validate,
  updateSchool
);

// =====================================================
// DELETE SCHOOL
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  schoolIdValidation,
  validate,
  deleteSchool
);

export default router;
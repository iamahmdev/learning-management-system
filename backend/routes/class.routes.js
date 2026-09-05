import express from "express";

import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createClassValidation,
  updateClassValidation,
  classIdValidation,
} from "../validations/class.validation.js";

const router = express.Router();

// =====================================================
// CREATE CLASS
// =====================================================

router.post(
  "/",
  isAuthenticated,
  createClassValidation,
  validate,
  createClass
);

// =====================================================
// GET ALL CLASSES
// =====================================================

router.get(
  "/",
  isAuthenticated,
  getAllClasses
);

// =====================================================
// GET CLASS BY ID
// =====================================================

router.get(
  "/:id",
  isAuthenticated,
  classIdValidation,
  validate,
  getClassById
);

// =====================================================
// UPDATE CLASS
// =====================================================

router.put(
  "/:id",
  isAuthenticated,
  updateClassValidation,
  validate,
  updateClass
);

// =====================================================
// DELETE CLASS
// =====================================================

router.delete(
  "/:id",
  isAuthenticated,
  classIdValidation,
  validate,
  deleteClass
);

export default router;
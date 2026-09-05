import express from "express";

import {
  createParentStudentRelationship,
  getAllParentStudentRelationships,
  getParentStudentRelationshipById,
  updateParentStudentRelationship,
  deleteParentStudentRelationship,
} from "../controllers/parent-student-relationship.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createParentStudentRelationshipValidation,
  updateParentStudentRelationshipValidation,
  parentStudentRelationshipIdValidation,
} from "../validations/parent-student-relationship.validation.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  isAuthenticated,
  createParentStudentRelationshipValidation,
  validate,
  createParentStudentRelationship
);

// GET ALL
router.get(
  "/",
  isAuthenticated,
  getAllParentStudentRelationships
);

// GET BY ID
router.get(
  "/:id",
  isAuthenticated,
  parentStudentRelationshipIdValidation,
  validate,
  getParentStudentRelationshipById
);

// UPDATE
router.put(
  "/:id",
  isAuthenticated,
  updateParentStudentRelationshipValidation,
  validate,
  updateParentStudentRelationship
);

// DELETE
router.delete(
  "/:id",
  isAuthenticated,
  parentStudentRelationshipIdValidation,
  validate,
  deleteParentStudentRelationship
);

export default router;
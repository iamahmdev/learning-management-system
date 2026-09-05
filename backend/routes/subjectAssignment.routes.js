import express from "express";

import {
  createSubjectAssignment,
  getAllSubjectAssignments,
  getSubjectAssignmentById,
  updateSubjectAssignment,
  deleteSubjectAssignment,
} from "../controllers/subjectAssignment.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE SUBJECT ASSIGNMENT
router.post("/", isAuthenticated, createSubjectAssignment);

// GET ALL SUBJECT ASSIGNMENTS
router.get("/", isAuthenticated, getAllSubjectAssignments);

// GET SUBJECT ASSIGNMENT BY ID
router.get("/:id", isAuthenticated, getSubjectAssignmentById);

// UPDATE SUBJECT ASSIGNMENT
router.put("/:id", isAuthenticated, updateSubjectAssignment);

// DELETE SUBJECT ASSIGNMENT
router.delete("/:id", isAuthenticated, deleteSubjectAssignment);

export default router;

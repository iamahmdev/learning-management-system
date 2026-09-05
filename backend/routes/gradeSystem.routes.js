import express from "express";

import {
  createGradeSystem,
  getAllGradeSystems,
  getGradeSystemById,
  updateGradeSystem,
  deleteGradeSystem,
} from "../controllers/gradeSystem.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE GRADE SYSTEM
router.post("/", isAuthenticated, createGradeSystem);

// GET ALL GRADE SYSTEMS
router.get("/", isAuthenticated, getAllGradeSystems);

// GET GRADE SYSTEM BY ID
router.get("/:id", isAuthenticated, getGradeSystemById);

// UPDATE GRADE SYSTEM
router.put("/:id", isAuthenticated, updateGradeSystem);

// DELETE GRADE SYSTEM
router.delete("/:id", isAuthenticated, deleteGradeSystem);

export default router;

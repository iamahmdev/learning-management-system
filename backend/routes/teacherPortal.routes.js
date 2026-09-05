import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createTeacherPortal,
  getAllTeacherPortals,
  getTeacherPortalById,
  updateTeacherPortal,
  deleteTeacherPortal,
} from "../controllers/teacherPortal.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createTeacherPortal);
router.get("/", isAuthenticated, getAllTeacherPortals);
router.get("/:id", isAuthenticated, getTeacherPortalById);
router.put("/:id", isAuthenticated, updateTeacherPortal);
router.delete("/:id", isAuthenticated, deleteTeacherPortal);

export default router;

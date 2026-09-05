import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createStudentPortal,
  getAllStudentPortals,
  getStudentPortalById,
  updateStudentPortal,
  deleteStudentPortal,
} from "../controllers/studentPortal.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createStudentPortal);
router.get("/", isAuthenticated, getAllStudentPortals);
router.get("/:id", isAuthenticated, getStudentPortalById);
router.put("/:id", isAuthenticated, updateStudentPortal);
router.delete("/:id", isAuthenticated, deleteStudentPortal);

export default router;

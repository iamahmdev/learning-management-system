import express from "express";
import { createScholarship, getAllScholarships, getScholarshipById, updateScholarship, deleteScholarship } from "../controllers/scholarship.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createScholarship);
router.get("/", isAuthenticated, getAllScholarships);
router.get("/:id", isAuthenticated, getScholarshipById);
router.put("/:id", isAuthenticated, updateScholarship);
router.delete("/:id", isAuthenticated, deleteScholarship);

export default router;

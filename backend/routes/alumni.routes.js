import express from "express";
import { createAlumni, getAllAlumni, getAlumniById, updateAlumni, deleteAlumni } from "../controllers/alumni.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createAlumni);
router.get("/", isAuthenticated, getAllAlumni);
router.get("/:id", isAuthenticated, getAlumniById);
router.put("/:id", isAuthenticated, updateAlumni);
router.delete("/:id", isAuthenticated, deleteAlumni);

export default router;

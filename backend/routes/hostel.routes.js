import express from "express";
import { createHostel, getAllHostels, getHostelById, updateHostel, deleteHostel } from "../controllers/hostel.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createHostel);
router.get("/", isAuthenticated, getAllHostels);
router.get("/:id", isAuthenticated, getHostelById);
router.put("/:id", isAuthenticated, updateHostel);
router.delete("/:id", isAuthenticated, deleteHostel);

export default router;

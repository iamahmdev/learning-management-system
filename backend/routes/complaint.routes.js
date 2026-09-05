import express from "express";
import { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint } from "../controllers/complaint.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createComplaint);
router.get("/", isAuthenticated, getAllComplaints);
router.get("/:id", isAuthenticated, getComplaintById);
router.put("/:id", isAuthenticated, updateComplaint);
router.delete("/:id", isAuthenticated, deleteComplaint);

export default router;

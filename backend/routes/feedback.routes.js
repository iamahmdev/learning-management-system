import express from "express";
import { createFeedback, getAllFeedback, getFeedbackById, updateFeedback, deleteFeedback } from "../controllers/feedback.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createFeedback);
router.get("/", isAuthenticated, getAllFeedback);
router.get("/:id", isAuthenticated, getFeedbackById);
router.put("/:id", isAuthenticated, updateFeedback);
router.delete("/:id", isAuthenticated, deleteFeedback);

export default router;

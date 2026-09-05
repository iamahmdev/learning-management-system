import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createAnalytics,
  getAllAnalytics,
  getAnalyticsById,
  updateAnalytics,
  deleteAnalytics,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createAnalytics);
router.get("/", isAuthenticated, getAllAnalytics);
router.get("/:id", isAuthenticated, getAnalyticsById);
router.put("/:id", isAuthenticated, updateAnalytics);
router.delete("/:id", isAuthenticated, deleteAnalytics);

export default router;

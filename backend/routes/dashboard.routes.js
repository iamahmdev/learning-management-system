import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createDashboard,
  getAllDashboards,
  getDashboardById,
  updateDashboard,
  deleteDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createDashboard);
router.get("/", isAuthenticated, getAllDashboards);
router.get("/:id", isAuthenticated, getDashboardById);
router.put("/:id", isAuthenticated, updateDashboard);
router.delete("/:id", isAuthenticated, deleteDashboard);

export default router;

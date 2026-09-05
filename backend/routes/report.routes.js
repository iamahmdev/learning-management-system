import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createReport);
router.get("/", isAuthenticated, getAllReports);
router.get("/:id", isAuthenticated, getReportById);
router.put("/:id", isAuthenticated, updateReport);
router.delete("/:id", isAuthenticated, deleteReport);

export default router;

import express from "express";
import { createHealthRecord, getAllHealthRecords, getHealthRecordById, updateHealthRecord, deleteHealthRecord } from "../controllers/healthRecord.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createHealthRecord);
router.get("/", isAuthenticated, getAllHealthRecords);
router.get("/:id", isAuthenticated, getHealthRecordById);
router.put("/:id", isAuthenticated, updateHealthRecord);
router.delete("/:id", isAuthenticated, deleteHealthRecord);

export default router;

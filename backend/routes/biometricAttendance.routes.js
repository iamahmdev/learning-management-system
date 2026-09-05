import express from "express";
import { createBiometricAttendance, getAllBiometricAttendance, getBiometricAttendanceById, updateBiometricAttendance, deleteBiometricAttendance } from "../controllers/biometricAttendance.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createBiometricAttendance);
router.get("/", isAuthenticated, getAllBiometricAttendance);
router.get("/:id", isAuthenticated, getBiometricAttendanceById);
router.put("/:id", isAuthenticated, updateBiometricAttendance);
router.delete("/:id", isAuthenticated, deleteBiometricAttendance);

export default router;

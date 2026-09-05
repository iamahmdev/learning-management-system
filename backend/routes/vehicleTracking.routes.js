import express from "express";
import { createVehicleTracking, getAllVehicleTracking, getVehicleTrackingById, deleteVehicleTracking } from "../controllers/vehicleTracking.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createVehicleTracking);
router.get("/", isAuthenticated, getAllVehicleTracking);
router.get("/:id", isAuthenticated, getVehicleTrackingById);
router.delete("/:id", isAuthenticated, deleteVehicleTracking);

export default router;

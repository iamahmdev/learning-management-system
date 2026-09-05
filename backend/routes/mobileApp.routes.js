import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  registerDevice,
  getAllDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "../controllers/mobileApp.controller.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerDevice);
router.get("/", isAuthenticated, getAllDevices);
router.get("/:id", isAuthenticated, getDeviceById);
router.put("/:id", isAuthenticated, updateDevice);
router.delete("/:id", isAuthenticated, deleteDevice);

export default router;

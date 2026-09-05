import express from "express";
import { createOnlineClass, getAllOnlineClasses, getOnlineClassById, updateOnlineClass, deleteOnlineClass } from "../controllers/onlineClass.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createOnlineClass);
router.get("/", isAuthenticated, getAllOnlineClasses);
router.get("/:id", isAuthenticated, getOnlineClassById);
router.put("/:id", isAuthenticated, updateOnlineClass);
router.delete("/:id", isAuthenticated, deleteOnlineClass);

export default router;

import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createParentPortal,
  getAllParentPortals,
  getParentPortalById,
  updateParentPortal,
  deleteParentPortal,
} from "../controllers/parentPortal.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createParentPortal);
router.get("/", isAuthenticated, getAllParentPortals);
router.get("/:id", isAuthenticated, getParentPortalById);
router.put("/:id", isAuthenticated, updateParentPortal);
router.delete("/:id", isAuthenticated, deleteParentPortal);

export default router;

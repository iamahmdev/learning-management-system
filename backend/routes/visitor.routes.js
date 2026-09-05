import express from "express";
import { createVisitor, getAllVisitors, getVisitorById, updateVisitor, deleteVisitor } from "../controllers/visitor.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createVisitor);
router.get("/", isAuthenticated, getAllVisitors);
router.get("/:id", isAuthenticated, getVisitorById);
router.put("/:id", isAuthenticated, updateVisitor);
router.delete("/:id", isAuthenticated, deleteVisitor);

export default router;

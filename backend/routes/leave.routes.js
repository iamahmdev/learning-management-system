import express from "express";
import { createLeave, getAllLeaves, getLeaveById, approveLeave, rejectLeave, deleteLeave } from "../controllers/leave.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createLeaveValidation, updateLeaveValidation, leaveIdValidation } from "../validations/leave.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createLeaveValidation, validate, createLeave);
router.get("/", isAuthenticated, getAllLeaves);
router.get("/:id", isAuthenticated, leaveIdValidation, validate, getLeaveById);
router.put("/:id/approve", isAuthenticated, updateLeaveValidation, validate, approveLeave);
router.put("/:id/reject", isAuthenticated, updateLeaveValidation, validate, rejectLeave);
router.delete("/:id", isAuthenticated, leaveIdValidation, validate, deleteLeave);

export default router;

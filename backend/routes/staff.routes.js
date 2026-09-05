import express from "express";
import { createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff } from "../controllers/staff.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createStaffValidation, updateStaffValidation, staffIdValidation } from "../validations/staff.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createStaffValidation, validate, createStaff);
router.get("/", isAuthenticated, getAllStaff);
router.get("/:id", isAuthenticated, staffIdValidation, validate, getStaffById);
router.put("/:id", isAuthenticated, updateStaffValidation, validate, updateStaff);
router.delete("/:id", isAuthenticated, staffIdValidation, validate, deleteStaff);

export default router;

import express from "express";
import { createAdmission, getAllAdmissions, getAdmissionById, updateAdmission, deleteAdmission } from "../controllers/admission.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createAdmissionValidation, updateAdmissionValidation, admissionIdValidation } from "../validations/admission.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createAdmissionValidation, validate, createAdmission);
router.get("/", isAuthenticated, getAllAdmissions);
router.get("/:id", isAuthenticated, admissionIdValidation, validate, getAdmissionById);
router.put("/:id", isAuthenticated, updateAdmissionValidation, validate, updateAdmission);
router.delete("/:id", isAuthenticated, admissionIdValidation, validate, deleteAdmission);

export default router;

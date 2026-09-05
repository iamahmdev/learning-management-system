import express from "express";
import { createCertificate, getAllCertificates, getCertificateById, updateCertificate, deleteCertificate } from "../controllers/certificate.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createCertificateValidation, updateCertificateValidation, certificateIdValidation } from "../validations/certificate.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createCertificateValidation, validate, createCertificate);
router.get("/", isAuthenticated, getAllCertificates);
router.get("/:id", isAuthenticated, certificateIdValidation, validate, getCertificateById);
router.put("/:id", isAuthenticated, updateCertificateValidation, validate, updateCertificate);
router.delete("/:id", isAuthenticated, certificateIdValidation, validate, deleteCertificate);

export default router;

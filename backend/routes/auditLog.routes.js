import express from "express";
import { createAuditLog, getAllAuditLogs, getAuditLogById } from "../controllers/auditLog.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createAuditLogValidation, auditLogIdValidation } from "../validations/auditLog.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createAuditLogValidation, validate, createAuditLog);
router.get("/", isAuthenticated, getAllAuditLogs);
router.get("/:id", isAuthenticated, auditLogIdValidation, validate, getAuditLogById);

export default router;

import { body, param } from "express-validator";

export const createAuditLogValidation = [
  body("userId").trim().notEmpty().isMongoId(),
  body("action").notEmpty().isIn(["create", "read", "update", "delete", "login", "logout", "approve", "reject", "other"]),
  body("module").trim().notEmpty(),
  body("resourceType").optional().trim(),
  body("resourceId").optional().isMongoId(),
  body("details").optional(),
  body("ipAddress").optional().trim(),
  body("userAgent").optional().trim(),
];

export const auditLogIdValidation = [param("id").isMongoId()];

import { body, param } from "express-validator";

export const createCertificateValidation = [
  body("schoolId").trim().notEmpty().isMongoId(),
  body("studentId").trim().notEmpty().isMongoId(),
  body("certificateType").notEmpty().isIn(["character", "transfer", "bonafide", "completion", "achievement", "participation", "other"]),
  body("certificateNumber").trim().notEmpty(),
  body("issueDate").optional().isISO8601(),
  body("purpose").optional().trim().isLength({ max: 200 }),
  body("content").optional().trim().isLength({ max: 2000 }),
  body("status").optional().isIn(["draft", "issued", "revoked"]),
  body("issuedBy").trim().notEmpty().isMongoId(),
];

export const updateCertificateValidation = [
  param("id").isMongoId(),
  body("status").optional().isIn(["draft", "issued", "revoked"]),
  body("content").optional().trim().isLength({ max: 2000 }),
];

export const certificateIdValidation = [param("id").isMongoId()];

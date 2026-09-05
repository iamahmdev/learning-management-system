import { body, param } from "express-validator";

export const createSettingValidation = [
  body("schoolId").trim().notEmpty().isMongoId(),
  body("category").notEmpty().isIn(["general", "academic", "attendance", "exam", "fee", "notification", "security", "other"]),
  body("key").trim().notEmpty(),
  body("value").notEmpty(),
  body("description").optional().trim().isLength({ max: 500 }),
  body("isPublic").optional().isBoolean(),
];

export const updateSettingValidation = [
  param("id").isMongoId(),
  body("value").optional(),
  body("description").optional().trim().isLength({ max: 500 }),
  body("isPublic").optional().isBoolean(),
];

export const settingIdValidation = [param("id").isMongoId()];

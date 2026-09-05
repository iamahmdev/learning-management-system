import { body, param } from "express-validator";

export const createNotificationValidation = [
  body("schoolId").trim().notEmpty().isMongoId(),
  body("userId").trim().notEmpty().isMongoId(),
  body("title").trim().notEmpty().isLength({ max: 200 }),
  body("message").trim().notEmpty().isLength({ max: 1000 }),
  body("type").optional().isIn(["info", "warning", "success", "error", "reminder", "announcement"]),
  body("category").optional().isIn(["academic", "attendance", "exam", "fee", "library", "transport", "event", "general"]),
  body("priority").optional().isIn(["low", "medium", "high"]),
  body("link").optional().trim(),
];

export const notificationIdValidation = [param("id").isMongoId()];

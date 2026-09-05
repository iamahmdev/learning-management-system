import { body, param } from "express-validator";

export const createCommunicationValidation = [
  body("schoolId").trim().notEmpty().isMongoId().withMessage("Invalid School ID"),
  body("title").trim().notEmpty().isLength({ max: 200 }).withMessage("Title is required"),
  body("message").trim().notEmpty().isLength({ max: 5000 }).withMessage("Message is required"),
  body("communicationType").notEmpty().isIn(["notice", "circular", "announcement", "alert", "newsletter"]),
  body("targetAudience").notEmpty().isIn(["all", "students", "parents", "teachers", "staff", "specific"]),
  body("specificRecipients").optional().isArray(),
  body("classIds").optional().isArray(),
  body("sectionIds").optional().isArray(),
  body("priority").optional().isIn(["low", "medium", "high", "urgent"]),
  body("attachments").optional().isArray(),
  body("publishDate").optional().isISO8601(),
  body("expiryDate").optional().isISO8601(),
  body("status").optional().isIn(["draft", "published", "archived"]),
  body("createdBy").trim().notEmpty().isMongoId().withMessage("Created by is required"),
];

export const updateCommunicationValidation = [
  param("id").isMongoId().withMessage("Invalid Communication ID"),
  body("title").optional().trim().isLength({ max: 200 }),
  body("message").optional().trim().isLength({ max: 5000 }),
  body("communicationType").optional().isIn(["notice", "circular", "announcement", "alert", "newsletter"]),
  body("targetAudience").optional().isIn(["all", "students", "parents", "teachers", "staff", "specific"]),
  body("priority").optional().isIn(["low", "medium", "high", "urgent"]),
  body("status").optional().isIn(["draft", "published", "archived"]),
];

export const communicationIdValidation = [param("id").isMongoId().withMessage("Invalid Communication ID")];

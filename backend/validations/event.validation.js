import { body, param } from "express-validator";

export const createEventValidation = [
  body("schoolId").trim().notEmpty().isMongoId(),
  body("title").trim().notEmpty().isLength({ max: 200 }),
  body("description").optional().trim().isLength({ max: 2000 }),
  body("eventType").notEmpty().isIn(["academic", "cultural", "sports", "holiday", "exam", "parent-meeting", "workshop", "other"]),
  body("startDate").notEmpty().isISO8601(),
  body("endDate").notEmpty().isISO8601(),
  body("startTime").optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body("endTime").optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body("venue").optional().trim().isLength({ max: 200 }),
  body("organizer").optional().trim().isLength({ max: 200 }),
  body("targetAudience").optional().isIn(["all", "students", "parents", "teachers", "staff", "specific"]),
  body("classIds").optional().isArray(),
  body("attachments").optional().isArray(),
  body("isHoliday").optional().isBoolean(),
  body("status").optional().isIn(["scheduled", "ongoing", "completed", "cancelled"]),
  body("createdBy").trim().notEmpty().isMongoId(),
];

export const updateEventValidation = [
  param("id").isMongoId(),
  body("title").optional().trim().isLength({ max: 200 }),
  body("description").optional().trim().isLength({ max: 2000 }),
  body("eventType").optional().isIn(["academic", "cultural", "sports", "holiday", "exam", "parent-meeting", "workshop", "other"]),
  body("startDate").optional().isISO8601(),
  body("endDate").optional().isISO8601(),
  body("startTime").optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body("endTime").optional().matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body("status").optional().isIn(["scheduled", "ongoing", "completed", "cancelled"]),
];

export const eventIdValidation = [param("id").isMongoId()];

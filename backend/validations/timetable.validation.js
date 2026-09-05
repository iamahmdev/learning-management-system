import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

const time = Joi.string()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .messages({
    "string.pattern.base": "Time must be in HH:mm format",
  });

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const createTimetableValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic Year ID is required",
  }),

  classId: objectId.required().messages({
    "any.required": "Class ID is required",
  }),

  sectionId: objectId.required().messages({
    "any.required": "Section ID is required",
  }),

  subjectId: objectId.required().messages({
    "any.required": "Subject ID is required",
  }),

  teacherId: objectId.required().messages({
    "any.required": "Teacher ID is required",
  }),

  day: Joi.string()
    .valid(...days)
    .required()
    .messages({
      "any.required": "Day is required",
      "any.only": "Invalid day",
    }),

  startTime: time.required().messages({
    "any.required": "Start time is required",
  }),

  endTime: time.required().messages({
    "any.required": "End time is required",
  }),

  room: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("active", "inactive")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

export const updateTimetableValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  classId: objectId.optional(),

  sectionId: objectId.optional(),

  subjectId: objectId.optional(),

  teacherId: objectId.optional(),

  day: Joi.string()
    .valid(...days)
    .optional()
    .messages({
      "any.only": "Invalid day",
    }),

  startTime: time.optional(),

  endTime: time.optional(),

  room: Joi.string().trim().max(100).allow("").optional(),

  status: Joi.string()
    .valid("active", "inactive")
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  updatedBy: objectId.optional(),
}).min(1);
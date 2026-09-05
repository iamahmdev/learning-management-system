import { body, param } from "express-validator";

export const createAdmissionValidation = [
  body("schoolId").trim().notEmpty().isMongoId(),
  body("academicYearId").trim().notEmpty().isMongoId(),
  body("applicationNumber").trim().notEmpty().isLength({ min: 2, max: 50 }),
  body("studentName").trim().notEmpty().isLength({ max: 100 }),
  body("dateOfBirth").notEmpty().isISO8601(),
  body("gender").notEmpty().isIn(["male", "female", "other"]),
  body("classAppliedFor").trim().notEmpty().isMongoId(),
  body("guardianPhone").trim().notEmpty(),
  body("guardianEmail").optional().trim().isEmail(),
  body("applicationDate").optional().isISO8601(),
  body("status").optional().isIn(["pending", "approved", "rejected", "waitlisted", "admitted"]),
];

export const updateAdmissionValidation = [
  param("id").isMongoId(),
  body("status").optional().isIn(["pending", "approved", "rejected", "waitlisted", "admitted"]),
  body("remarks").optional().trim().isLength({ max: 500 }),
];

export const admissionIdValidation = [param("id").isMongoId()];

import express from "express";

import {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createSectionValidation,
  updateSectionValidation,
  sectionIdValidation,
} from "../validations/section.validation.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  createSectionValidation,
  validate,
  createSection
);

router.get(
  "/",
  isAuthenticated,
  getAllSections
);

router.get(
  "/:id",
  isAuthenticated,
  sectionIdValidation,
  validate,
  getSectionById
);

router.put(
  "/:id",
  isAuthenticated,
  updateSectionValidation,
  validate,
  updateSection
);

router.delete(
  "/:id",
  isAuthenticated,
  sectionIdValidation,
  validate,
  deleteSection
);

export default router;
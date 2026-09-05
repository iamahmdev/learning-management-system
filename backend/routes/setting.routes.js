import express from "express";
import { createSetting, getAllSettings, getSettingById, updateSetting, deleteSetting } from "../controllers/setting.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createSettingValidation, updateSettingValidation, settingIdValidation } from "../validations/setting.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createSettingValidation, validate, createSetting);
router.get("/", isAuthenticated, getAllSettings);
router.get("/:id", isAuthenticated, settingIdValidation, validate, getSettingById);
router.put("/:id", isAuthenticated, updateSettingValidation, validate, updateSetting);
router.delete("/:id", isAuthenticated, settingIdValidation, validate, deleteSetting);

export default router;

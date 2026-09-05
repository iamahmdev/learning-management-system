import express from "express";
import isAuthenticated from "../middlewares/auth.middleware.js";
import {
  createWebhook,
  getAllWebhooks,
  getWebhookById,
  updateWebhook,
  deleteWebhook,
} from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createWebhook);
router.get("/", isAuthenticated, getAllWebhooks);
router.get("/:id", isAuthenticated, getWebhookById);
router.put("/:id", isAuthenticated, updateWebhook);
router.delete("/:id", isAuthenticated, deleteWebhook);

export default router;

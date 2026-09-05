import express from "express";
import { createIDCard, getAllIDCards, getIDCardById, updateIDCard, deleteIDCard } from "../controllers/idCard.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createIDCard);
router.get("/", isAuthenticated, getAllIDCards);
router.get("/:id", isAuthenticated, getIDCardById);
router.put("/:id", isAuthenticated, updateIDCard);
router.delete("/:id", isAuthenticated, deleteIDCard);

export default router;

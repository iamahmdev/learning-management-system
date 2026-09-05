import express from "express";
import { createCanteenItem, getAllCanteenItems, getCanteenItemById, updateCanteenItem, deleteCanteenItem } from "../controllers/canteen.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createCanteenItem);
router.get("/", isAuthenticated, getAllCanteenItems);
router.get("/:id", isAuthenticated, getCanteenItemById);
router.put("/:id", isAuthenticated, updateCanteenItem);
router.delete("/:id", isAuthenticated, deleteCanteenItem);

export default router;

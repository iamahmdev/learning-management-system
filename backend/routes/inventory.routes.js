import express from "express";
import { createInventory, getAllInventory, getInventoryById, updateInventory, deleteInventory } from "../controllers/inventory.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createInventoryValidation, updateInventoryValidation, inventoryIdValidation } from "../validations/inventory.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createInventoryValidation, validate, createInventory);
router.get("/", isAuthenticated, getAllInventory);
router.get("/:id", isAuthenticated, inventoryIdValidation, validate, getInventoryById);
router.put("/:id", isAuthenticated, updateInventoryValidation, validate, updateInventory);
router.delete("/:id", isAuthenticated, inventoryIdValidation, validate, deleteInventory);

export default router;

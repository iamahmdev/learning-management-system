import { body, param } from "express-validator";

export const createInventoryValidation = [
  body("schoolId").trim().notEmpty().isMongoId().withMessage("Invalid School ID"),
  body("itemName").trim().notEmpty().isLength({ max: 200 }).withMessage("Item name is required"),
  body("itemCode").trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage("Item code is required"),
  body("category").notEmpty().isIn(["furniture", "electronics", "stationery", "sports-equipment", "laboratory-equipment", "books", "cleaning-supplies", "other"]),
  body("quantity").notEmpty().isInt({ min: 0 }).withMessage("Quantity must be 0 or more"),
  body("unitPrice").optional().isFloat({ min: 0 }),
  body("supplier").optional().trim().isLength({ max: 200 }),
  body("purchaseDate").optional().isISO8601(),
  body("warrantyExpiry").optional().isISO8601(),
  body("location").optional().trim().isLength({ max: 200 }),
  body("condition").optional().isIn(["new", "good", "fair", "poor", "damaged"]),
  body("status").optional().isIn(["available", "in-use", "under-maintenance", "disposed"]),
  body("description").optional().trim().isLength({ max: 1000 }),
];

export const updateInventoryValidation = [
  param("id").isMongoId().withMessage("Invalid Inventory ID"),
  body("itemName").optional().trim().isLength({ max: 200 }),
  body("itemCode").optional().trim().isLength({ min: 2, max: 50 }),
  body("category").optional().isIn(["furniture", "electronics", "stationery", "sports-equipment", "laboratory-equipment", "books", "cleaning-supplies", "other"]),
  body("quantity").optional().isInt({ min: 0 }),
  body("unitPrice").optional().isFloat({ min: 0 }),
  body("supplier").optional().trim().isLength({ max: 200 }),
  body("purchaseDate").optional().isISO8601(),
  body("warrantyExpiry").optional().isISO8601(),
  body("location").optional().trim().isLength({ max: 200 }),
  body("condition").optional().isIn(["new", "good", "fair", "poor", "damaged"]),
  body("status").optional().isIn(["available", "in-use", "under-maintenance", "disposed"]),
  body("description").optional().trim().isLength({ max: 1000 }),
];

export const inventoryIdValidation = [param("id").isMongoId().withMessage("Invalid Inventory ID")];

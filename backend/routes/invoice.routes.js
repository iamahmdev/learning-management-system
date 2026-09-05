import express from "express";
import { createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice } from "../controllers/invoice.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createInvoice);
router.get("/", isAuthenticated, getAllInvoices);
router.get("/:id", isAuthenticated, getInvoiceById);
router.put("/:id", isAuthenticated, updateInvoice);
router.delete("/:id", isAuthenticated, deleteInvoice);

export default router;

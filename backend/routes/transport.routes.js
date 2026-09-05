import express from "express";

import {
  createTransport,
  getAllTransports,
  getTransportById,
  updateTransport,
  deleteTransport,
} from "../controllers/transport.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create Transport
router.post("/", isAuthenticated, createTransport);

// Get All Transports
router.get("/", isAuthenticated, getAllTransports);

// Get Single Transport
router.get("/:id", isAuthenticated, getTransportById);

// Update Transport
router.put("/:id", isAuthenticated, updateTransport);

// Delete Transport
router.delete("/:id", isAuthenticated, deleteTransport);

export default router;

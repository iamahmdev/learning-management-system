import express from "express";

import {
  createTransportRoute,
  getAllTransportRoutes,
  getTransportRouteById,
  updateTransportRoute,
  deleteTransportRoute,
} from "../controllers/transportRoute.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE TRANSPORT ROUTE
router.post("/", isAuthenticated, createTransportRoute);

// GET ALL TRANSPORT ROUTES
router.get("/", isAuthenticated, getAllTransportRoutes);

// GET TRANSPORT ROUTE BY ID
router.get("/:id", isAuthenticated, getTransportRouteById);

// UPDATE TRANSPORT ROUTE
router.put("/:id", isAuthenticated, updateTransportRoute);

// DELETE TRANSPORT ROUTE
router.delete("/:id", isAuthenticated, deleteTransportRoute);

export default router;

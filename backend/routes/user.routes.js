import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMyProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

// Auth Routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
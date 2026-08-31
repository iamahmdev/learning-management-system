import express from "express";

import {
  registerUser,
  loginUser,
  loginAdmin,
  logoutUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateRegisterUser,
  validateLoginUser,
  validateAdminLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateUser,
  validateUserId,
} from "../validations/user.validation.js";

const router = express.Router();

// =====================================================
// AUTH ROUTES
// =====================================================

// Register User
router.post(
  "/register",
  validateRegisterUser,
  registerUser
);

// Login User
router.post(
  "/login",
  validateLoginUser,
  loginUser
);

// Admin Login
router.post(
  "/admin/login",
  validateAdminLogin,
  loginAdmin
);

// Logout User / Admin
router.post(
  "/logout",
  logoutUser
);

// Forgot Password
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password/:token",
  validateResetPassword,
  resetPassword
);

// =====================================================
// CURRENT USER
// =====================================================

// Get Current Logged-In User
router.get(
  "/me",
  isAuthenticated,
  getCurrentUser
);

// =====================================================
// USER MANAGEMENT - ADMIN ONLY
// =====================================================

// Get All Users
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

// Get Single User
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUserId,
  getUserById
);

// Update User
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUpdateUser,
  updateUser
);

// Delete User
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateUserId,
  deleteUser
);

export default router;
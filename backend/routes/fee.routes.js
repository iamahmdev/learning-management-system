import express from "express";

import {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
} from "../controllers/fee.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateFee,
  validateUpdateFee,
  validateFeeId,
} from "../validations/fee.validation.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateCreateFee,
  createFee
);

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff", "teacher"),
  getAllFees
);

router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff", "teacher"),
  validateFeeId,
  getFeeById
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateFeeId,
  validateUpdateFee,
  updateFee
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateFeeId,
  deleteFee
);

export default router;

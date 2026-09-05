import express from "express";

import {
  createFeePayment,
  getAllFeePayments,
  getFeePaymentById,
  updateFeePayment,
  deleteFeePayment,
} from "../controllers/feePayment.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateFeePayment,
  validateUpdateFeePayment,
  validateFeePaymentId,
} from "../validations/feePayment.validation.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateCreateFeePayment,
  createFeePayment
);

router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff", "teacher"),
  getAllFeePayments
);

router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff", "teacher"),
  validateFeePaymentId,
  getFeePaymentById
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateFeePaymentId,
  validateUpdateFeePayment,
  updateFeePayment
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateFeePaymentId,
  deleteFeePayment
);

export default router;

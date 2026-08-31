import express from "express";

import {
  issueBook,
  returnBook,
  getAllBookIssues,
  getOverdueBooks,
} from "../controllers/bookIssue.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateIssueBook,
  validateReturnBook,
  validateBookIssueId,
} from "../validations/bookIssue.validation.js";

const router = express.Router();

// Issue Book
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateIssueBook,
  issueBook
);

// Get All Book Issues
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff"),
  getAllBookIssues
);

// Get Overdue Books
router.get(
  "/overdue",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  getOverdueBooks
);

// Return Book
router.put(
  "/:id/return",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateBookIssueId,
  validateReturnBook,
  returnBook
);

export default router;
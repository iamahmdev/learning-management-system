import express from "express";

import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  validateCreateBook,
  validateBookId,
} from "../validations/book.validation.js";

const router = express.Router();

// Create Book
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateCreateBook,
  createBook
);

// Get All Books
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff"),
  getAllBooks
);

// Get Book by ID
router.get(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher", "student", "staff"),
  validateBookId,
  getBookById
);

// Update Book
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "staff"),
  validateBookId,
  updateBook
);

// Delete Book
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  validateBookId,
  deleteBook
);

export default router;
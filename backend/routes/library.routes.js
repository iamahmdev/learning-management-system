import express from "express";

import {
  createLibraryBook,
  getAllLibraryBooks,
  getLibraryBookById,
  updateLibraryBook,
  deleteLibraryBook,
  issueBook,
  returnBook,
  getAllBookIssues,
  getOverdueBooks,
} from "../controllers/library.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createLibraryBookValidation,
  updateLibraryBookValidation,
  bookIdValidation,
  issueBookValidation,
  returnBookValidation,
} from "../validations/library.validation.js";

const router = express.Router();

// =====================================================
// LIBRARY BOOK MANAGEMENT
// =====================================================

// CREATE LIBRARY BOOK
// POST /api/library/books
router.post(
  "/books",
  isAuthenticated,
  createLibraryBookValidation,
  validate,
  createLibraryBook
);

// GET ALL LIBRARY BOOKS
// GET /api/library/books
router.get("/books", isAuthenticated, getAllLibraryBooks);

// GET LIBRARY BOOK BY ID
// GET /api/library/books/:id
router.get(
  "/books/:id",
  isAuthenticated,
  bookIdValidation,
  validate,
  getLibraryBookById
);

// UPDATE LIBRARY BOOK
// PUT /api/library/books/:id
router.put(
  "/books/:id",
  isAuthenticated,
  updateLibraryBookValidation,
  validate,
  updateLibraryBook
);

// DELETE LIBRARY BOOK
// DELETE /api/library/books/:id
router.delete(
  "/books/:id",
  isAuthenticated,
  bookIdValidation,
  validate,
  deleteLibraryBook
);

// =====================================================
// BOOK ISSUE & RETURN OPERATIONS
// =====================================================

// ISSUE BOOK
// POST /api/library/books/:id/issue
router.post(
  "/books/:id/issue",
  isAuthenticated,
  issueBookValidation,
  validate,
  issueBook
);

// RETURN BOOK
// POST /api/library/books/:id/return
router.post(
  "/books/:id/return",
  isAuthenticated,
  returnBookValidation,
  validate,
  returnBook
);

// GET ALL BOOK ISSUES
// GET /api/library/issues
router.get("/issues", isAuthenticated, getAllBookIssues);

// GET OVERDUE BOOKS
// GET /api/library/overdue
router.get("/overdue", isAuthenticated, getOverdueBooks);

export default router;

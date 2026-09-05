import { body, param } from "express-validator";

// Create Library Book Validation
export const createLibraryBookValidation = [
  body("schoolId")
    .trim()
    .notEmpty()
    .withMessage("School ID is required")
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("bookTitle")
    .trim()
    .notEmpty()
    .withMessage("Book title is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Book title must be between 2 and 200 characters"),

  body("bookCode")
    .trim()
    .notEmpty()
    .withMessage("Book code is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Book code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Book code can only contain letters, numbers, hyphens and underscores"
    ),

  body("isbn")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("ISBN cannot exceed 20 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ max: 150 })
    .withMessage("Author cannot exceed 150 characters"),

  body("publisher")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Publisher cannot exceed 150 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "fiction",
      "non-fiction",
      "science",
      "mathematics",
      "history",
      "geography",
      "literature",
      "language",
      "computer",
      "reference",
      "magazine",
      "other",
    ])
    .withMessage("Invalid category"),

  body("language")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Language cannot exceed 50 characters"),

  body("edition")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Edition cannot exceed 50 characters"),

  body("publicationYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 1 })
    .withMessage(
      `Publication year must be between 1800 and ${
        new Date().getFullYear() + 1
      }`
    ),

  body("pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Pages must be at least 1"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price cannot be negative"),

  body("totalCopies")
    .notEmpty()
    .withMessage("Total copies is required")
    .isInt({ min: 1 })
    .withMessage("Total copies must be at least 1"),

  body("availableCopies")
    .notEmpty()
    .withMessage("Available copies is required")
    .isInt({ min: 0 })
    .withMessage("Available copies cannot be negative"),

  body("issuedCopies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Issued copies cannot be negative"),

  body("shelfLocation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Shelf location cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("coverImage").optional().trim(),

  body("status")
    .optional()
    .isIn(["available", "out-of-stock", "discontinued"])
    .withMessage(
      "Status must be available, out-of-stock or discontinued"
    ),
];

// Update Library Book Validation
export const updateLibraryBookValidation = [
  param("id").isMongoId().withMessage("Invalid Book ID"),

  body("schoolId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid School ID"),

  body("bookTitle")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Book title must be between 2 and 200 characters"),

  body("bookCode")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Book code must be between 2 and 50 characters")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Book code can only contain letters, numbers, hyphens and underscores"
    ),

  body("isbn")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("ISBN cannot exceed 20 characters"),

  body("author")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Author cannot exceed 150 characters"),

  body("publisher")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Publisher cannot exceed 150 characters"),

  body("category")
    .optional()
    .isIn([
      "fiction",
      "non-fiction",
      "science",
      "mathematics",
      "history",
      "geography",
      "literature",
      "language",
      "computer",
      "reference",
      "magazine",
      "other",
    ])
    .withMessage("Invalid category"),

  body("language")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Language cannot exceed 50 characters"),

  body("edition")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Edition cannot exceed 50 characters"),

  body("publicationYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 1 })
    .withMessage(
      `Publication year must be between 1800 and ${
        new Date().getFullYear() + 1
      }`
    ),

  body("pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Pages must be at least 1"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price cannot be negative"),

  body("totalCopies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total copies must be at least 1"),

  body("availableCopies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available copies cannot be negative"),

  body("issuedCopies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Issued copies cannot be negative"),

  body("shelfLocation")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Shelf location cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("coverImage").optional().trim(),

  body("status")
    .optional()
    .isIn(["available", "out-of-stock", "discontinued"])
    .withMessage(
      "Status must be available, out-of-stock or discontinued"
    ),
];

// Book ID Validation
export const bookIdValidation = [
  param("id").isMongoId().withMessage("Invalid Book ID"),
];

// Issue Book Validation
export const issueBookValidation = [
  param("id").isMongoId().withMessage("Invalid Book ID"),

  body("studentId")
    .trim()
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("issueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isISO8601()
    .withMessage("Issue date must be a valid date"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("remarks").optional().trim(),
];

// Return Book Validation
export const returnBookValidation = [
  param("id").isMongoId().withMessage("Invalid Book ID"),

  body("studentId")
    .trim()
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid Student ID"),

  body("returnDate")
    .notEmpty()
    .withMessage("Return date is required")
    .isISO8601()
    .withMessage("Return date must be a valid date"),

  body("condition")
    .optional()
    .isIn(["good", "damaged", "lost"])
    .withMessage("Condition must be good, damaged or lost"),

  body("fineAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Fine amount cannot be negative"),

  body("remarks").optional().trim(),
];

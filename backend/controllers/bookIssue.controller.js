import mongoose from "mongoose";
import BookIssue from "../models/bookIssue.model.js";
import Book from "../models/book.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// ISSUE BOOK
// =====================================================

export const issueBook = async (req, res) => {
  try {
    const {
      schoolId,
      bookId,
      studentId,
      issueDate,
      dueDate,
      issuedBy,
      condition,
      remarks,
    } = req.body;

    // Check book availability
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.availableQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available for issue",
      });
    }

    // Check if student already has this book issued
    const existingIssue = await BookIssue.findOne({
      bookId,
      studentId,
      status: "issued",
    });

    if (existingIssue) {
      return res.status(400).json({
        success: false,
        message: "Student already has this book issued",
      });
    }

    // Create book issue
    const bookIssue = new BookIssue({
      schoolId,
      bookId,
      studentId,
      issueDate,
      dueDate,
      issuedBy,
      condition,
      remarks,
    });

    await bookIssue.save();

    // Update book quantities
    await Book.findByIdAndUpdate(bookId, {
      $inc: {
        availableQuantity: -1,
        issuedQuantity: 1,
      },
    });

    await bookIssue.populate([
      { path: "bookId", select: "title author bookCode" },
      { path: "studentId", populate: { path: "userId", select: "name" } },
      { path: "issuedBy", select: "name" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: bookIssue,
    });
  } catch (error) {
    console.error("Issue Book Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to issue book",
    });
  }
};

// =====================================================
// RETURN BOOK
// =====================================================

export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      returnedTo,
      actualReturnDate,
      returnCondition,
      returnRemarks,
      fineAmount,
    } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book issue ID format",
      });
    }

    const bookIssue = await BookIssue.findById(id);

    if (!bookIssue) {
      return res.status(404).json({
        success: false,
        message: "Book issue record not found",
      });
    }

    if (bookIssue.status !== "issued") {
      return res.status(400).json({
        success: false,
        message: "Book is not currently issued",
      });
    }

    // Update book issue record
    bookIssue.returnDate = actualReturnDate || new Date();
    bookIssue.actualReturnDate = actualReturnDate || new Date();
    bookIssue.returnedTo = returnedTo;
    bookIssue.returnCondition = returnCondition;
    bookIssue.returnRemarks = returnRemarks;
    bookIssue.fineAmount = fineAmount || 0;
    bookIssue.status = "returned";

    await bookIssue.save();

    // Update book quantities
    await Book.findByIdAndUpdate(bookIssue.bookId, {
      $inc: {
        availableQuantity: 1,
        issuedQuantity: -1,
      },
    });

    await bookIssue.populate([
      { path: "bookId", select: "title author bookCode" },
      { path: "studentId", populate: { path: "userId", select: "name" } },
      { path: "issuedBy", select: "name" },
      { path: "returnedTo", select: "name" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: bookIssue,
    });
  } catch (error) {
    console.error("Return Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to return book",
    });
  }
};

// =====================================================
// GET ALL BOOK ISSUES
// =====================================================

export const getAllBookIssues = async (req, res) => {
  try {
    const {
      schoolId,
      bookId,
      studentId,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (bookId && isValidObjectId(bookId)) {
      filter.bookId = bookId;
    }

    if (studentId && isValidObjectId(studentId)) {
      filter.studentId = studentId;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookIssues = await BookIssue.find(filter)
      .populate([
        { path: "bookId", select: "title author bookCode" },
        { path: "studentId", populate: { path: "userId", select: "name" } },
        { path: "issuedBy", select: "name" },
        { path: "returnedTo", select: "name" },
      ])
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await BookIssue.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Book issues retrieved successfully",
      count: bookIssues.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: bookIssues,
    });
  } catch (error) {
    console.error("Get All Book Issues Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve book issues",
    });
  }
};

// =====================================================
// GET OVERDUE BOOKS
// =====================================================

export const getOverdueBooks = async (req, res) => {
  try {
    const { schoolId } = req.query;

    const filter = {
      status: "issued",
      dueDate: { $lt: new Date() },
    };

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    const overdueBooks = await BookIssue.find(filter)
      .populate([
        { path: "bookId", select: "title author bookCode" },
        { path: "studentId", populate: { path: "userId", select: "name email phone" } },
        { path: "issuedBy", select: "name" },
      ])
      .sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      message: "Overdue books retrieved successfully",
      count: overdueBooks.length,
      data: overdueBooks,
    });
  } catch (error) {
    console.error("Get Overdue Books Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve overdue books",
    });
  }
};
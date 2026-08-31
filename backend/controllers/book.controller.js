import mongoose from "mongoose";
import Book from "../models/book.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE BOOK
// =====================================================

export const createBook = async (req, res) => {
  try {
    const {
      schoolId,
      title,
      author,
      isbn,
      publisher,
      publishYear,
      edition,
      language,
      pages,
      category,
      subject,
      description,
      totalQuantity,
      availableQuantity,
      price,
      location,
      rackNumber,
      bookCode,
      status,
      addedBy,
      notes,
    } = req.body;

    // Set issued quantity
    const issuedQuantity = totalQuantity - availableQuantity;

    const book = new Book({
      schoolId,
      title,
      author,
      isbn,
      publisher,
      publishYear,
      edition,
      language,
      pages,
      category,
      subject,
      description,
      totalQuantity,
      availableQuantity,
      issuedQuantity,
      price,
      location,
      rackNumber,
      bookCode,
      status,
      addedBy,
      notes,
    });

    await book.save();

    await book.populate([
      { path: "schoolId", select: "name" },
      { path: "addedBy", select: "name" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Create Book Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Book with this code or ISBN already exists",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create book",
    });
  }
};

// =====================================================
// GET ALL BOOKS
// =====================================================

export const getAllBooks = async (req, res) => {
  try {
    const {
      schoolId,
      category,
      status,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
        { bookCode: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await Book.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "addedBy", select: "name" },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Book.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      count: books.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: books,
    });
  } catch (error) {
    console.error("Get All Books Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
    });
  }
};

// =====================================================
// GET BOOK BY ID
// =====================================================

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const book = await Book.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "addedBy", select: "name" },
      ]);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error("Get Book By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
    });
  }
};

// =====================================================
// UPDATE BOOK
// =====================================================

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    // Recalculate issued quantity if quantities are updated
    if (updateData.totalQuantity && updateData.availableQuantity) {
      updateData.issuedQuantity = updateData.totalQuantity - updateData.availableQuantity;
    }

    const book = await Book.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "addedBy", select: "name" },
    ]);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Update Book Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Book with this code or ISBN already exists",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};

// =====================================================
// DELETE BOOK
// =====================================================

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};
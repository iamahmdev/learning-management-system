import mongoose from "mongoose";

import Library from "../models/library.model.js";
import BookIssue from "../models/bookIssue.model.js";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";

// =====================================================
// CREATE LIBRARY BOOK
// =====================================================
export const createLibraryBook = async (req, res) => {
  try {
    const {
      schoolId,
      bookTitle,
      bookCode,
      isbn,
      author,
      publisher,
      category,
      language,
      edition,
      publicationYear,
      pages,
      price,
      totalCopies,
      availableCopies,
      issuedCopies,
      shelfLocation,
      description,
      coverImage,
      status,
    } = req.body;

    // Validate School
    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate totalCopies = availableCopies + issuedCopies
    const finalIssuedCopies = issuedCopies || 0;
    if (availableCopies + finalIssuedCopies !== totalCopies) {
      return res.status(400).json({
        success: false,
        message:
          "Available copies + Issued copies must equal Total copies",
      });
    }

    // Check duplicate Book Code in same school
    const duplicateBookCode = await Library.findOne({
      schoolId,
      bookCode: bookCode.toUpperCase(),
    });

    if (duplicateBookCode) {
      return res.status(409).json({
        success: false,
        message: "Book code already exists in this school",
      });
    }

    // Create Library Book
    const book = await Library.create({
      schoolId,
      bookTitle,
      bookCode,
      isbn,
      author,
      publisher,
      category,
      language,
      edition,
      publicationYear,
      pages,
      price,
      totalCopies,
      availableCopies,
      issuedCopies: finalIssuedCopies,
      shelfLocation,
      description,
      coverImage,
      status,
    });

    // Populate school
    await book.populate({
      path: "schoolId",
      select: "name code email phone status",
    });

    return res.status(201).json({
      success: true,
      message: "Library book created successfully",
      book,
    });
  } catch (error) {
    console.error("Create Library Book Error:", error);

    // MongoDB duplicate key
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate book code",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create library book",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL LIBRARY BOOKS
// =====================================================
export const getAllLibraryBooks = async (req, res) => {
  try {
    const {
      schoolId,
      category,
      status,
      author,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    // Validate schoolId
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    // Filter by category
    if (category) {
      const allowedCategories = [
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
      ];

      if (!allowedCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });
      }

      filter.category = category;
    }

    // Filter by status
    if (status) {
      const allowedStatuses = [
        "available",
        "out-of-stock",
        "discontinued",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    // Filter by author
    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    // Search by book title or book code
    if (search) {
      filter.$or = [
        { bookTitle: { $regex: search, $options: "i" } },
        { bookCode: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const books = await Library.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalBooks = await Library.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Library books fetched successfully",
      count: books.length,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limitNum),
      currentPage: pageNum,
      books,
    });
  } catch (error) {
    console.error("Get All Library Books Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch library books",
      error: error.message,
    });
  }
};

// =====================================================
// GET LIBRARY BOOK BY ID
// =====================================================
export const getLibraryBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Library.findById(id).populate({
      path: "schoolId",
      select: "name code email phone status",
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Library book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Library book fetched successfully",
      book,
    });
  } catch (error) {
    console.error("Get Library Book By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch library book",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE LIBRARY BOOK
// =====================================================
export const updateLibraryBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Library.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Library book not found",
      });
    }

    const {
      schoolId,
      bookTitle,
      bookCode,
      isbn,
      author,
      publisher,
      category,
      language,
      edition,
      publicationYear,
      pages,
      price,
      totalCopies,
      availableCopies,
      issuedCopies,
      shelfLocation,
      description,
      coverImage,
      status,
    } = req.body;

    const finalSchoolId = schoolId || book.schoolId;
    const finalTotalCopies = totalCopies || book.totalCopies;
    const finalAvailableCopies =
      availableCopies !== undefined
        ? availableCopies
        : book.availableCopies;
    const finalIssuedCopies =
      issuedCopies !== undefined ? issuedCopies : book.issuedCopies;

    // Validate School
    const school = await School.findById(finalSchoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate totalCopies = availableCopies + issuedCopies
    if (
      finalAvailableCopies + finalIssuedCopies !==
      finalTotalCopies
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Available copies + Issued copies must equal Total copies",
      });
    }

    // Check duplicate Book Code
    if (bookCode) {
      const duplicateBookCode = await Library.findOne({
        schoolId: finalSchoolId,
        bookCode: bookCode.toUpperCase(),
        _id: { $ne: id },
      });

      if (duplicateBookCode) {
        return res.status(409).json({
          success: false,
          message: "Book code already exists in this school",
        });
      }
    }

    // Update fields
    book.schoolId = finalSchoolId;

    if (bookTitle !== undefined) book.bookTitle = bookTitle;
    if (bookCode !== undefined) book.bookCode = bookCode;
    if (isbn !== undefined) book.isbn = isbn;
    if (author !== undefined) book.author = author;
    if (publisher !== undefined) book.publisher = publisher;
    if (category !== undefined) book.category = category;
    if (language !== undefined) book.language = language;
    if (edition !== undefined) book.edition = edition;
    if (publicationYear !== undefined)
      book.publicationYear = publicationYear;
    if (pages !== undefined) book.pages = pages;
    if (price !== undefined) book.price = price;
    if (totalCopies !== undefined) book.totalCopies = totalCopies;
    if (availableCopies !== undefined)
      book.availableCopies = availableCopies;
    if (issuedCopies !== undefined)
      book.issuedCopies = issuedCopies;
    if (shelfLocation !== undefined)
      book.shelfLocation = shelfLocation;
    if (description !== undefined) book.description = description;
    if (coverImage !== undefined) book.coverImage = coverImage;
    if (status !== undefined) book.status = status;

    await book.save();

    await book.populate({
      path: "schoolId",
      select: "name code email phone status",
    });

    return res.status(200).json({
      success: true,
      message: "Library book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Update Library Book Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate book code",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update library book",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE LIBRARY BOOK
// =====================================================
export const deleteLibraryBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Library.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Library book not found",
      });
    }

    // Check if book has active issues
    const activeIssues = await BookIssue.countDocuments({
      bookId: id,
      status: { $in: ["issued", "overdue"] },
    });

    if (activeIssues > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete book with active issues. Please return all copies first",
      });
    }

    await Library.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Library book deleted successfully",
    });
  } catch (error) {
    console.error("Delete Library Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete library book",
      error: error.message,
    });
  }
};

// =====================================================
// ISSUE BOOK
// =====================================================
export const issueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, issueDate, dueDate, remarks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    // Validate Book
    const book = await Library.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Library book not found",
      });
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({
        success: false,
        message: "No copies available for issue",
      });
    }

    // Validate Student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check if student already has this book issued
    const existingIssue = await BookIssue.findOne({
      bookId: id,
      studentId,
      status: { $in: ["issued", "overdue"] },
    });

    if (existingIssue) {
      return res.status(400).json({
        success: false,
        message: "Student already has this book issued",
      });
    }

    // Validate issue and due dates
    const issueDateObj = new Date(issueDate);
    const dueDateObj = new Date(dueDate);

    if (dueDateObj <= issueDateObj) {
      return res.status(400).json({
        success: false,
        message: "Due date must be after issue date",
      });
    }

    // Create book issue record
    const bookIssue = await BookIssue.create({
      schoolId: book.schoolId,
      bookId: id,
      studentId,
      issueDate: issueDateObj,
      dueDate: dueDateObj,
      status: "issued",
      remarks,
    });

    // Update book inventory
    book.availableCopies -= 1;
    book.issuedCopies += 1;

    if (book.availableCopies === 0) {
      book.status = "out-of-stock";
    }

    await book.save();

    // Populate book issue
    await bookIssue.populate([
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "bookId",
        select:
          "bookTitle bookCode author category availableCopies totalCopies",
      },
      {
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Book issued successfully",
      bookIssue,
    });
  } catch (error) {
    console.error("Issue Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to issue book",
      error: error.message,
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
      studentId,
      returnDate,
      condition,
      fineAmount,
      remarks,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    // Validate Book
    const book = await Library.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Library book not found",
      });
    }

    // Validate Student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Find active issue record
    const bookIssue = await BookIssue.findOne({
      bookId: id,
      studentId,
      status: { $in: ["issued", "overdue"] },
    });

    if (!bookIssue) {
      return res.status(404).json({
        success: false,
        message: "No active issue found for this book and student",
      });
    }

    // Validate return date
    const returnDateObj = new Date(returnDate);

    if (returnDateObj < bookIssue.issueDate) {
      return res.status(400).json({
        success: false,
        message: "Return date cannot be before issue date",
      });
    }

    // Update book issue record
    bookIssue.returnDate = returnDateObj;
    bookIssue.status = "returned";

    if (condition !== undefined) {
      bookIssue.condition = condition;
    }

    if (fineAmount !== undefined) {
      bookIssue.fineAmount = fineAmount;
    }

    if (remarks !== undefined) {
      bookIssue.remarks = remarks;
    }

    await bookIssue.save();

    // Update book inventory
    book.availableCopies += 1;
    book.issuedCopies -= 1;

    if (book.availableCopies > 0 && book.status === "out-of-stock") {
      book.status = "available";
    }

    // If book is lost, reduce total copies
    if (condition === "lost") {
      book.totalCopies -= 1;
      book.availableCopies -= 1;
    }

    await book.save();

    // Populate book issue
    await bookIssue.populate([
      {
        path: "schoolId",
        select: "name code email phone status",
      },
      {
        path: "bookId",
        select:
          "bookTitle bookCode author category availableCopies totalCopies",
      },
      {
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      bookIssue,
    });
  } catch (error) {
    console.error("Return Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to return book",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL BOOK ISSUES
// =====================================================
export const getAllBookIssues = async (req, res) => {
  try {
    const { schoolId, studentId, bookId, status, page = 1, limit = 20 } = req.query;

    const filter = {};

    // Validate schoolId
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    // Validate studentId
    if (studentId) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }
      filter.studentId = studentId;
    }

    // Validate bookId
    if (bookId) {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Book ID",
        });
      }
      filter.bookId = bookId;
    }

    // Filter by status
    if (status) {
      const allowedStatuses = ["issued", "returned", "overdue"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const bookIssues = await BookIssue.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "bookId",
        select:
          "bookTitle bookCode author category availableCopies totalCopies",
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalIssues = await BookIssue.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Book issues fetched successfully",
      count: bookIssues.length,
      totalIssues,
      totalPages: Math.ceil(totalIssues / limitNum),
      currentPage: pageNum,
      bookIssues,
    });
  } catch (error) {
    console.error("Get All Book Issues Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch book issues",
      error: error.message,
    });
  }
};

// =====================================================
// GET OVERDUE BOOKS
// =====================================================
export const getOverdueBooks = async (req, res) => {
  try {
    const { schoolId, page = 1, limit = 20 } = req.query;

    const filter = {
      status: "issued",
      dueDate: { $lt: new Date() },
    };

    // Validate schoolId
    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Update overdue status
    await BookIssue.updateMany(filter, { status: "overdue" });

    // Fetch overdue books
    const overdueBooks = await BookIssue.find({
      ...filter,
      status: "overdue",
    })
      .populate({
        path: "schoolId",
        select: "name code email phone status",
      })
      .populate({
        path: "bookId",
        select:
          "bookTitle bookCode author category availableCopies totalCopies",
      })
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      })
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limitNum);

    const totalOverdue = await BookIssue.countDocuments({
      ...filter,
      status: "overdue",
    });

    return res.status(200).json({
      success: true,
      message: "Overdue books fetched successfully",
      count: overdueBooks.length,
      totalOverdue,
      totalPages: Math.ceil(totalOverdue / limitNum),
      currentPage: pageNum,
      overdueBooks,
    });
  } catch (error) {
    console.error("Get Overdue Books Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch overdue books",
      error: error.message,
    });
  }
};

import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [2, "Book title must be at least 2 characters"],
      maxlength: [200, "Book title cannot exceed 200 characters"],
    },

    bookCode: {
      type: String,
      required: [true, "Book code is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "Book code must be at least 2 characters"],
      maxlength: [50, "Book code cannot exceed 50 characters"],
    },

    isbn: {
      type: String,
      trim: true,
      maxlength: [20, "ISBN cannot exceed 20 characters"],
      default: "",
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [150, "Author cannot exceed 150 characters"],
    },

    publisher: {
      type: String,
      trim: true,
      maxlength: [150, "Publisher cannot exceed 150 characters"],
      default: "",
    },

    category: {
      type: String,
      enum: [
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
      ],
      required: [true, "Category is required"],
    },

    language: {
      type: String,
      trim: true,
      maxlength: [50, "Language cannot exceed 50 characters"],
      default: "English",
    },

    edition: {
      type: String,
      trim: true,
      maxlength: [50, "Edition cannot exceed 50 characters"],
      default: "",
    },

    publicationYear: {
      type: Number,
      min: [1800, "Publication year must be after 1800"],
      max: [new Date().getFullYear() + 1, "Publication year cannot be in the future"],
    },

    pages: {
      type: Number,
      min: [1, "Pages must be at least 1"],
    },

    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0,
    },

    totalCopies: {
      type: Number,
      required: [true, "Total copies is required"],
      min: [1, "Total copies must be at least 1"],
      default: 1,
    },

    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      min: [0, "Available copies cannot be negative"],
      default: 1,
    },

    issuedCopies: {
      type: Number,
      min: [0, "Issued copies cannot be negative"],
      default: 0,
    },

    shelfLocation: {
      type: String,
      trim: true,
      maxlength: [100, "Shelf location cannot exceed 100 characters"],
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["available", "out-of-stock", "discontinued"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

// Book code unique within school
librarySchema.index(
  {
    schoolId: 1,
    bookCode: 1,
  },
  {
    unique: true,
  }
);

// Validation: availableCopies + issuedCopies should equal totalCopies
librarySchema.pre("save", function (next) {
  if (this.availableCopies + this.issuedCopies !== this.totalCopies) {
    return next(
      new Error(
        "Available copies + Issued copies must equal Total copies"
      )
    );
  }
  next();
});

const Library = mongoose.model("Library", librarySchema);

export default Library;

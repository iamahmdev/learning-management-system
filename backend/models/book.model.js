import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [200, "Book title cannot exceed 200 characters"],
      index: true,
    },

    author: {
      type: String,
      required: [true, "Book author is required"],
      trim: true,
      maxlength: [100, "Book author cannot exceed 100 characters"],
      index: true,
    },

    isbn: {
      type: String,
      trim: true,
      maxlength: [20, "ISBN cannot exceed 20 characters"],
      default: "",
      index: true,
      sparse: true,
    },

    publisher: {
      type: String,
      trim: true,
      maxlength: [100, "Publisher cannot exceed 100 characters"],
      default: "",
    },

    publishYear: {
      type: Number,
      min: [1000, "Publish year must be a valid year"],
      max: [new Date().getFullYear(), "Publish year cannot be in the future"],
      default: null,
    },

    edition: {
      type: String,
      trim: true,
      maxlength: [50, "Edition cannot exceed 50 characters"],
      default: "",
    },

    language: {
      type: String,
      trim: true,
      maxlength: [50, "Language cannot exceed 50 characters"],
      default: "English",
    },

    pages: {
      type: Number,
      min: [1, "Pages must be at least 1"],
      max: [10000, "Pages cannot exceed 10000"],
      default: null,
    },

    category: {
      type: String,
      enum: [
        "academic",
        "fiction",
        "non-fiction",
        "science",
        "mathematics",
        "history",
        "geography",
        "literature",
        "reference",
        "biography",
        "technology",
        "arts",
        "sports",
        "general",
        "other",
      ],
      default: "general",
    },

    subject: {
      type: String,
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"],
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    totalQuantity: {
      type: Number,
      required: [true, "Total quantity is required"],
      min: [1, "Total quantity must be at least 1"],
      max: [10000, "Total quantity cannot exceed 10000"],
    },

    availableQuantity: {
      type: Number,
      required: [true, "Available quantity is required"],
      min: [0, "Available quantity cannot be negative"],
      max: [10000, "Available quantity cannot exceed 10000"],
    },

    issuedQuantity: {
      type: Number,
      min: [0, "Issued quantity cannot be negative"],
      default: 0,
    },

    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0,
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
      default: "",
    },

    rackNumber: {
      type: String,
      trim: true,
      maxlength: [50, "Rack number cannot exceed 50 characters"],
      default: "",
    },

    bookCode: {
      type: String,
      required: [true, "Book code is required"],
      trim: true,
      uppercase: true,
      maxlength: [50, "Book code cannot exceed 50 characters"],
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "damaged", "lost"],
      default: "active",
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Added by user ID is required"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Validate available quantity <= total quantity
bookSchema.pre("validate", function(next) {
  if (this.availableQuantity > this.totalQuantity) {
    return next(new Error("Available quantity cannot exceed total quantity"));
  }
  
  if (this.issuedQuantity + this.availableQuantity !== this.totalQuantity) {
    return next(new Error("Issued quantity + Available quantity must equal Total quantity"));
  }
  
  next();
});

// Prevent duplicate book codes within same school
bookSchema.index(
  {
    schoolId: 1,
    bookCode: 1,
  },
  {
    unique: true,
  }
);

// Prevent duplicate ISBN within same school (if provided)
bookSchema.index(
  {
    schoolId: 1,
    isbn: 1,
  },
  {
    unique: true,
    sparse: true,
  }
);

// Index for search functionality
bookSchema.index({
  schoolId: 1,
  title: 1,
  author: 1,
  category: 1,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
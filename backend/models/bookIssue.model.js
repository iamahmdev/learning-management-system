import mongoose from "mongoose";

const bookIssueSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    returnDate: {
      type: Date,
      default: null,
    },

    actualReturnDate: {
      type: Date,
      default: null,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Issued by user ID is required"],
    },

    returnedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["issued", "returned", "overdue", "lost", "damaged"],
      default: "issued",
    },

    fineAmount: {
      type: Number,
      min: [0, "Fine amount cannot be negative"],
      default: 0,
    },

    finePaid: {
      type: Boolean,
      default: false,
    },

    finePaymentDate: {
      type: Date,
      default: null,
    },

    condition: {
      type: String,
      enum: ["excellent", "good", "fair", "poor", "damaged"],
      default: "good",
    },

    renewalCount: {
      type: Number,
      min: [0, "Renewal count cannot be negative"],
      max: [5, "Maximum 5 renewals allowed"],
      default: 0,
    },

    maxRenewals: {
      type: Number,
      min: [0, "Max renewals cannot be negative"],
      max: [10, "Max renewals cannot exceed 10"],
      default: 3,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    returnCondition: {
      type: String,
      enum: ["excellent", "good", "fair", "poor", "damaged"],
      default: null,
    },

    returnRemarks: {
      type: String,
      trim: true,
      maxlength: [500, "Return remarks cannot exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Validate due date is after issue date
bookIssueSchema.pre("validate", function(next) {
  if (this.issueDate && this.dueDate) {
    if (this.issueDate >= this.dueDate) {
      return next(new Error("Due date must be after issue date"));
    }
  }

  if (this.returnDate && this.issueDate) {
    if (this.returnDate < this.issueDate) {
      return next(new Error("Return date cannot be before issue date"));
    }
  }

  if (this.renewalCount > this.maxRenewals) {
    return next(new Error("Renewal count cannot exceed maximum renewals allowed"));
  }

  next();
});

// Prevent duplicate active issues for same book and student
bookIssueSchema.index(
  {
    bookId: 1,
    studentId: 1,
    status: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "issued"
    }
  }
);

// Index for efficient queries
bookIssueSchema.index({
  schoolId: 1,
  studentId: 1,
  issueDate: -1,
});

bookIssueSchema.index({
  schoolId: 1,
  bookId: 1,
  status: 1,
});

bookIssueSchema.index({
  dueDate: 1,
  status: 1,
});

const BookIssue = mongoose.model("BookIssue", bookIssueSchema);

export default BookIssue;
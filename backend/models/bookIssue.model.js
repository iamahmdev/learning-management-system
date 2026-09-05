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
      ref: "Library",
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
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["issued", "returned", "overdue"],
      default: "issued",
    },

    condition: {
      type: String,
      enum: ["good", "damaged", "lost"],
      default: "good",
    },

    fineAmount: {
      type: Number,
      min: [0, "Fine amount cannot be negative"],
      default: 0,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Index for finding active issues
bookIssueSchema.index({ status: 1 });

// Index for finding overdue books
bookIssueSchema.index({ dueDate: 1, status: 1 });

const BookIssue = mongoose.model("BookIssue", bookIssueSchema);

export default BookIssue;

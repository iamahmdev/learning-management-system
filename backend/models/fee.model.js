import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    feeType: {
      type: String,
      enum: [
        "tuition",
        "admission",
        "exam",
        "transport",
        "library",
        "lab",
        "sports",
        "other",
      ],
      required: [true, "Fee type is required"],
      lowercase: true,
      trim: true,
      index: true,
    },

    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: [0, "Fee amount cannot be negative"],
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: [0, "Paid amount cannot be negative"],
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      index: true,
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "bank", "online", "card", "other"],
      default: null,
      lowercase: true,
      trim: true,
    },

    transactionId: {
      type: String,
      trim: true,
      maxlength: [100, "Transaction ID cannot exceed 100 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "partial", "paid", "overdue"],
      default: "pending",
      lowercase: true,
      index: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user ID is required"],
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate fee record for same student,
// academic year and fee type with same due date
feeSchema.index(
  {
    studentId: 1,
    academicYearId: 1,
    feeType: 1,
    dueDate: 1,
  },
  {
    unique: true,
  }
);

// Automatically calculate fee status
feeSchema.pre("validate", function () {
  if (this.amount !== undefined && this.paidAmount !== undefined) {
    if (this.paidAmount > this.amount) {
      this.invalidate(
        "paidAmount",
        "Paid amount cannot be greater than fee amount"
      );
    }

    if (this.paidAmount === 0) {
      this.status = "pending";
    } else if (this.paidAmount < this.amount) {
      this.status = "partial";
    } else if (this.paidAmount === this.amount) {
      this.status = "paid";
    }
  }

  if (
    this.status === "pending" &&
    this.dueDate &&
    new Date(this.dueDate) < new Date()
  ) {
    this.status = "overdue";
  }
});

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
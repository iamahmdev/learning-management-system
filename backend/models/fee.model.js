import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },

    feeType: {
      type: String,
      enum: [
        "tuition",
        "admission",
        "exam",
        "transport",
        "library",
        "laboratory",
        "sports",
        "uniform",
        "books",
        "other",
      ],
      required: [true, "Fee type is required"],
    },

    title: {
      type: String,
      required: [true, "Fee title is required"],
      trim: true,
      maxlength: [100, "Fee title cannot exceed 100 characters"],
    },

    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: [0, "Fee amount cannot be negative"],
    },

    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      default: 0,
    },

    fine: {
      type: Number,
      min: [0, "Fine cannot be negative"],
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },

    paidAmount: {
      type: Number,
      min: [0, "Paid amount cannot be negative"],
      default: 0,
    },

    remainingAmount: {
      type: Number,
      min: [0, "Remaining amount cannot be negative"],
      default: 0,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    paymentDate: {
      type: Date,
    },

    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "bank_transfer",
        "card",
        "online",
        "cheque",
        "other",
      ],
      default: "cash",
    },

    transactionId: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "Transaction ID cannot exceed 100 characters",
      ],
      default: "",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Remarks cannot exceed 500 characters",
      ],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user ID is required"],
    },

    status: {
      type: String,
      enum: [
        "pending",
        "partial",
        "paid",
        "overdue",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total and remaining amount
feeSchema.pre("validate", function (next) {
  const amount = this.amount || 0;
  const discount = this.discount || 0;
  const fine = this.fine || 0;
  const paidAmount = this.paidAmount || 0;

  const calculatedTotal = amount - discount + fine;

  if (calculatedTotal < 0) {
    return next(
      new Error(
        "Discount cannot be greater than the fee amount"
      )
    );
  }

  if (paidAmount > calculatedTotal) {
    return next(
      new Error(
        "Paid amount cannot be greater than total fee amount"
      )
    );
  }

  this.totalAmount = calculatedTotal;
  this.remainingAmount = calculatedTotal - paidAmount;

  // Automatically determine payment status
  if (this.status !== "cancelled") {
    if (paidAmount === 0) {
      this.status =
        this.dueDate && new Date() > this.dueDate
          ? "overdue"
          : "pending";
    } else if (paidAmount < calculatedTotal) {
      this.status = "partial";
    } else {
      this.status = "paid";
    }
  }

  next();
});

// Prevent duplicate transaction IDs when provided
feeSchema.index(
  {
    schoolId: 1,
    transactionId: 1,
  },
  {
    unique: true,
    sparse: true,
  }
);

// Improve common student fee queries
feeSchema.index({
  schoolId: 1,
  academicYearId: 1,
  studentId: 1,
  dueDate: 1,
});

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
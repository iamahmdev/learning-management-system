import mongoose from "mongoose";

const feePaymentSchema = new mongoose.Schema(
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

    feeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fee",
      required: [true, "Fee ID is required"],
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },

    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0.01, "Payment amount must be greater than 0"],
    },

    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"],
      default: Date.now,
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
      required: [true, "Payment method is required"],
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

    receiptNumber: {
      type: String,
      required: [true, "Receipt number is required"],
      trim: true,
      uppercase: true,
      maxlength: [
        50,
        "Receipt number cannot exceed 50 characters",
      ],
    },

    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Collected by user ID is required"],
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

    status: {
      type: String,
      enum: ["completed", "refunded", "cancelled"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate receipt numbers within the same school
feePaymentSchema.index(
  {
    schoolId: 1,
    receiptNumber: 1,
  },
  {
    unique: true,
  }
);

// Prevent duplicate transaction IDs when provided
feePaymentSchema.index(
  {
    schoolId: 1,
    transactionId: 1,
  },
  {
    unique: true,
    sparse: true,
  }
);

// Improve fee payment history queries
feePaymentSchema.index({
  schoolId: 1,
  feeId: 1,
  paymentDate: -1,
});

// Improve student payment history queries
feePaymentSchema.index({
  schoolId: 1,
  studentId: 1,
  paymentDate: -1,
});

// Validate payment amount
feePaymentSchema.pre("validate", function (next) {
  if (this.amount !== undefined && this.amount <= 0) {
    return next(
      new Error("Payment amount must be greater than 0")
    );
  }

  next();
});

const FeePayment = mongoose.model(
  "FeePayment",
  feePaymentSchema
);

export default FeePayment;
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    expenseCategory: {
      type: String,
      enum: [
        "salary",
        "maintenance",
        "utilities",
        "supplies",
        "transport",
        "rent",
        "equipment",
        "marketing",
        "other",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "cheque", "bank-transfer", "card", "upi", "other"],
      required: true,
    },

    referenceNumber: {
      type: String,
      trim: true,
    },

    vendorName: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    vendorContact: {
      type: String,
      trim: true,
    },

    invoiceNumber: {
      type: String,
      trim: true,
    },

    attachments: [String],

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "paid", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

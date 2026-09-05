import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      enum: ["salary", "maintenance", "utilities", "supplies", "transport", "equipment", "marketing", "other"],
      required: true,
    },

    fiscalYear: {
      type: String,
      required: true,
      trim: true,
    },

    allocatedAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    spentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "exceeded"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

budgetSchema.pre("save", function (next) {
  this.remainingAmount = this.allocatedAmount - this.spentAmount;
  if (this.spentAmount > this.allocatedAmount) {
    this.status = "exceeded";
  }
  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;

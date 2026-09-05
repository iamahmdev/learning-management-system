import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
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

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      index: true,
    },

    name: {
      type: String,
      required: [true, "Fee structure name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
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
        "annual",
        "development",
        "other",
      ],
      required: [true, "Fee type is required"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    frequency: {
      type: String,
      enum: ["one-time", "monthly", "quarterly", "half-yearly", "annually"],
      required: [true, "Frequency is required"],
      default: "annually",
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    lateFee: {
      type: Number,
      default: 0,
      min: [0, "Late fee cannot be negative"],
    },

    lateFeeApplicableAfterDays: {
      type: Number,
      default: 0,
      min: [0, "Days cannot be negative"],
    },

    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },

    isOptional: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

// Unique fee structure per class and academic year
feeStructureSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    classId: 1,
    feeType: 1,
  },
  {
    unique: true,
  }
);

const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);

export default FeeStructure;

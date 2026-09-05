import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
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

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Employee ID is required"],
      index: true,
    },

    salaryMonth: {
      type: String,
      required: [true, "Salary month is required"],
      match: [/^\d{4}-(0[1-9]|1[0-2])$/, "Salary month must be in YYYY-MM format"],
      index: true,
    },

    basicSalary: {
      type: Number,
      required: [true, "Basic salary is required"],
      min: [0, "Basic salary cannot be negative"],
    },

    allowances: {
      type: Number,
      default: 0,
      min: [0, "Allowances cannot be negative"],
    },

    deductions: {
      type: Number,
      default: 0,
      min: [0, "Deductions cannot be negative"],
    },

    netSalary: {
      type: Number,
      required: [true, "Net salary is required"],
      min: [0, "Net salary cannot be negative"],
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
      enum: ["pending", "paid", "cancelled"],
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

// One payroll record per employee per month
payrollSchema.index(
  {
    employeeId: 1,
    salaryMonth: 1,
  },
  {
    unique: true,
  }
);

// Automatically calculate net salary
payrollSchema.pre("validate", function () {
  const basicSalary = this.basicSalary || 0;
  const allowances = this.allowances || 0;
  const deductions = this.deductions || 0;

  this.netSalary = basicSalary + allowances - deductions;

  if (this.netSalary < 0) {
    this.invalidate(
      "deductions",
      "Deductions cannot be greater than total salary"
    );
  }
});

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    scholarshipName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    scholarshipType: {
      type: String,
      enum: ["merit", "need-based", "sports", "special", "government", "other"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },

    criteria: {
      type: String,
      trim: true,
      maxlength: 500,
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
      enum: ["active", "expired", "revoked"],
      default: "active",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;

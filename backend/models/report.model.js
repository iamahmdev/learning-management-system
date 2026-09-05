import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
      index: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reportType: {
      type: String,
      required: true,
      enum: [
        "attendance",
        "fee",
        "result",
        "student",
        "teacher",
        "exam",
        "library",
        "transport",
        "admission",
        "expense",
        "budget",
        "payroll",
        "custom",
      ],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    filters: {
      type: mongoose.Schema.Types.Mixed,
    },

    dateRange: {
      startDate: Date,
      endDate: Date,
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
    },

    fileUrl: {
      type: String,
    },

    format: {
      type: String,
      enum: ["pdf", "excel", "csv", "json"],
      default: "pdf",
    },

    status: {
      type: String,
      enum: ["generating", "completed", "failed"],
      default: "completed",
    },

    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;

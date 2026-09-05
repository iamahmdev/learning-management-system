import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
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
      required: [true, "Academic year ID is required"],
      index: true,
    },

    name: {
      type: String,
      required: [true, "Exam name is required"],
      trim: true,
      minlength: [2, "Exam name must be at least 2 characters"],
      maxlength: [100, "Exam name cannot exceed 100 characters"],
    },

    code: {
      type: String,
      required: [true, "Exam code is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "Exam code must be at least 2 characters"],
      maxlength: [30, "Exam code cannot exceed 30 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    examType: {
      type: String,
      required: [true, "Exam type is required"],
      enum: {
        values: [
          "monthly",
          "midterm",
          "final",
          "annual",
          "quiz",
          "assignment",
          "other",
        ],
        message: "Invalid exam type",
      },
      lowercase: true,
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be greater than 0"],
    },

    passingMarks: {
      type: Number,
      required: [true, "Passing marks are required"],
      min: [0, "Passing marks cannot be negative"],
    },

    status: {
      type: String,
      enum: {
        values: ["draft", "scheduled", "ongoing", "completed", "cancelled"],
        message: "Invalid exam status",
      },
      default: "draft",
      lowercase: true,
      index: true,
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

// Exam code must be unique within a school and academic year
examSchema.index(
  { schoolId: 1, academicYearId: 1, code: 1 },
  { unique: true }
);

// Validate that end date is not before start date
examSchema.pre("validate", function () {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    this.invalidate(
      "endDate",
      "End date cannot be earlier than start date"
    );
  }

  if (
    this.totalMarks !== undefined &&
    this.passingMarks !== undefined &&
    this.passingMarks > this.totalMarks
  ) {
    this.invalidate(
      "passingMarks",
      "Passing marks cannot be greater than total marks"
    );
  }
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
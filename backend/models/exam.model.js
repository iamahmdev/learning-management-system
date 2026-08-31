import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
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

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
    },

    name: {
      type: String,
      required: [true, "Exam name is required"],
      trim: true,
      minlength: [2, "Exam name must be at least 2 characters"],
      maxlength: [100, "Exam name cannot exceed 100 characters"],
    },

    type: {
      type: String,
      required: [true, "Exam type is required"],
      enum: [
        "monthly",
        "mid_term",
        "final",
        "annual",
        "quiz",
        "test",
        "practical",
        "other",
      ],
    },

    startDate: {
      type: Date,
      required: [true, "Exam start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "Exam end date is required"],
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

    description: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Description cannot exceed 500 characters",
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
        "draft",
        "scheduled",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate exam names
// for the same school, academic year and class
examSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    classId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

// Validate exam dates and marks
examSchema.pre("validate", function (next) {
  // Start date cannot be after end date.
  // Same-day exams are allowed.
  if (this.startDate && this.endDate) {
    if (this.startDate > this.endDate) {
      return next(
        new Error("Start date cannot be after end date")
      );
    }
  }

  // Passing marks cannot exceed total marks.
  if (
    this.passingMarks !== undefined &&
    this.totalMarks !== undefined
  ) {
    if (this.passingMarks > this.totalMarks) {
      return next(
        new Error(
          "Passing marks cannot be greater than total marks"
        )
      );
    }
  }

  next();
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
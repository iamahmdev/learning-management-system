import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
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

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
      index: true,
    },

    marksObtained: {
      type: Number,
      required: [true, "Marks obtained are required"],
      min: [0, "Marks obtained cannot be negative"],
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be greater than 0"],
    },

    grade: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [5, "Grade cannot exceed 5 characters"],
      default: "",
    },

    percentage: {
      type: Number,
      min: [0, "Percentage cannot be negative"],
      max: [100, "Percentage cannot exceed 100"],
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["pass", "fail", "absent"],
        message: "Invalid result status",
      },
      default: "pass",
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

// One result per student, exam and subject
resultSchema.index(
  {
    studentId: 1,
    examId: 1,
    subjectId: 1,
  },
  {
    unique: true,
  }
);

// Validate marks and calculate percentage
resultSchema.pre("validate", function () {
  if (
    this.marksObtained !== undefined &&
    this.totalMarks !== undefined
  ) {
    if (this.marksObtained > this.totalMarks) {
      this.invalidate(
        "marksObtained",
        "Marks obtained cannot be greater than total marks"
      );
    }

    this.percentage = Number(
      ((this.marksObtained / this.totalMarks) * 100).toFixed(2)
    );

    if (this.status !== "absent") {
      this.status = this.percentage >= 40 ? "pass" : "fail";
    }
  }
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
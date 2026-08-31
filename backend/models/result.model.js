import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam ID is required"],
      index: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      index: true,
    },

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section ID is required"],
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
      index: true,
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

    obtainedMarks: {
      type: Number,
      required: [true, "Obtained marks are required"],
      min: [0, "Obtained marks cannot be negative"],
    },

    percentage: {
      type: Number,
      min: [0, "Percentage cannot be negative"],
      max: [100, "Percentage cannot exceed 100"],
      default: 0,
    },

    grade: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [10, "Grade cannot exceed 10 characters"],
      default: "",
    },

    gradePoint: {
      type: Number,
      min: [0, "Grade point cannot be negative"],
      default: 0,
    },

    status: {
      type: String,
      enum: {
        values: [
          "pass",
          "fail",
          "absent",
          "withheld",
          "incomplete",
        ],
        message: "Invalid result status",
      },
      default: "pass",
      index: true,
    },

    attendanceStatus: {
      type: String,
      enum: {
        values: ["present", "absent", "excused"],
        message: "Invalid attendance status",
      },
      default: "present",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    position: {
      type: Number,
      min: [1, "Position must be at least 1"],
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
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

// Validate marks
resultSchema.pre("validate", function (next) {
  if (
    this.obtainedMarks !== undefined &&
    this.totalMarks !== undefined &&
    this.obtainedMarks > this.totalMarks
  ) {
    return next(
      new Error("Obtained marks cannot exceed total marks")
    );
  }

  if (
    this.passingMarks !== undefined &&
    this.totalMarks !== undefined &&
    this.passingMarks > this.totalMarks
  ) {
    return next(
      new Error("Passing marks cannot exceed total marks")
    );
  }

  next();
});

// Calculate percentage automatically
resultSchema.pre("validate", function (next) {
  if (
    this.totalMarks > 0 &&
    this.obtainedMarks !== undefined
  ) {
    this.percentage = Number(
      (
        (this.obtainedMarks / this.totalMarks) *
        100
      ).toFixed(2)
    );
  }

  next();
});

// Automatically determine result status
resultSchema.pre("validate", function (next) {
  if (this.attendanceStatus === "absent") {
    this.status = "absent";
    return next();
  }

  if (this.attendanceStatus === "excused") {
    this.status = "incomplete";
    return next();
  }

  if (
    this.obtainedMarks !== undefined &&
    this.passingMarks !== undefined
  ) {
    this.status =
      this.obtainedMarks >= this.passingMarks
        ? "pass"
        : "fail";
  }

  next();
});

// Automatically set publication date
resultSchema.pre("save", function (next) {
  if (this.isModified("isPublished")) {
    if (this.isPublished && !this.publishedAt) {
      this.publishedAt = new Date();
    }

    if (!this.isPublished) {
      this.publishedAt = null;
    }
  }

  next();
});

// Prevent duplicate result for same student, exam and subject
resultSchema.index(
  {
    studentId: 1,
    examId: 1,
    subjectId: 1,
  },
  {
    unique: true,
    name: "unique_student_exam_subject_result",
  }
);

// Improve exam result queries
resultSchema.index({
  examId: 1,
  subjectId: 1,
});

// Improve student academic result queries
resultSchema.index({
  studentId: 1,
  academicYearId: 1,
});

// Improve class and section result queries
resultSchema.index({
  schoolId: 1,
  classId: 1,
  sectionId: 1,
  examId: 1,
});

// Improve result status queries
resultSchema.index({
  academicYearId: 1,
  examId: 1,
  status: 1,
});

// Improve published result queries
resultSchema.index({
  schoolId: 1,
  examId: 1,
  isPublished: 1,
});

// Model
const Result = mongoose.model("Result", resultSchema);

export default Result;
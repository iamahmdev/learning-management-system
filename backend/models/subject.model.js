import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
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
      required: [true, "Subject name is required"],
      trim: true,
      minlength: [2, "Subject name must be at least 2 characters"],
      maxlength: [100, "Subject name cannot exceed 100 characters"],
    },

    code: {
      type: String,
      required: [true, "Subject code is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "Subject code must be at least 2 characters"],
      maxlength: [20, "Subject code cannot exceed 20 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    maxMarks: {
      type: Number,
      required: [true, "Maximum marks are required"],
      min: [1, "Maximum marks must be at least 1"],
      default: 100,
    },

    passingMarks: {
      type: Number,
      required: [true, "Passing marks are required"],
      min: [0, "Passing marks cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.maxMarks;
        },
        message: "Passing marks cannot be greater than maximum marks",
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate subject code
// within the same school, academic year and class
subjectSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    classId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
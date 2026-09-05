import mongoose from "mongoose";

const homeworkSubmissionSchema = new mongoose.Schema(
  {
    homeworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homework",
      required: [true, "Homework ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    submittedDate: {
      type: Date,
      default: Date.now,
    },

    submissionText: {
      type: String,
      trim: true,
      maxlength: [5000, "Submission text cannot exceed 5000 characters"],
      default: "",
    },

    attachments: [
      {
        type: String,
        trim: true,
      },
    ],

    marksObtained: {
      type: Number,
      min: [0, "Marks obtained cannot be negative"],
      default: null,
    },

    feedback: {
      type: String,
      trim: true,
      maxlength: [1000, "Feedback cannot exceed 1000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["submitted", "graded", "late", "not-submitted"],
      default: "submitted",
    },

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    gradedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate submissions
homeworkSubmissionSchema.index(
  {
    homeworkId: 1,
    studentId: 1,
  },
  {
    unique: true,
  }
);

const HomeworkSubmission = mongoose.model(
  "HomeworkSubmission",
  homeworkSubmissionSchema
);

export default HomeworkSubmission;

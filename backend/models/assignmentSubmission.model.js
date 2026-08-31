import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    submissionText: {
      type: String,
      trim: true,
      maxlength: [5000, "Submission text cannot exceed 5000 characters"],
      default: "",
    },

    attachmentUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Attachment URL cannot exceed 500 characters"],
      default: "",
    },

    submissionDate: {
      type: Date,
      required: [true, "Submission date is required"],
      default: Date.now,
    },

    isLateSubmission: {
      type: Boolean,
      default: false,
    },

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

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    gradedDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["submitted", "graded", "returned", "resubmitted"],
      default: "submitted",
    },

    submissionVersion: {
      type: Number,
      min: [1, "Submission version must be at least 1"],
      default: 1,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate submissions for same assignment and student
assignmentSubmissionSchema.index(
  {
    assignmentId: 1,
    studentId: 1,
    submissionVersion: 1,
  },
  {
    unique: true,
  }
);

// Index for efficient queries
assignmentSubmissionSchema.index({
  assignmentId: 1,
  submissionDate: -1,
});

assignmentSubmissionSchema.index({
  studentId: 1,
  submissionDate: -1,
});

assignmentSubmissionSchema.index({
  schoolId: 1,
  status: 1,
  submissionDate: -1,
});

// Validate marks obtained against assignment max marks
assignmentSubmissionSchema.pre("validate", function(next) {
  if (this.marksObtained !== null && this.marksObtained !== undefined) {
    if (this.marksObtained < 0) {
      return next(new Error("Marks obtained cannot be negative"));
    }
  }
  next();
});

const AssignmentSubmission = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);

export default AssignmentSubmission;
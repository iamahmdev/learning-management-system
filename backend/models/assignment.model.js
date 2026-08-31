import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
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

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher ID is required"],
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

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
      maxlength: [200, "Assignment title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      required: [true, "Assignment description is required"],
      trim: true,
      maxlength: [2000, "Assignment description cannot exceed 2000 characters"],
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, "Instructions cannot exceed 1000 characters"],
      default: "",
    },

    assignedDate: {
      type: Date,
      required: [true, "Assigned date is required"],
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    maxMarks: {
      type: Number,
      required: [true, "Maximum marks is required"],
      min: [1, "Maximum marks must be at least 1"],
      max: [1000, "Maximum marks cannot exceed 1000"],
    },

    attachmentUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Attachment URL cannot exceed 500 characters"],
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    submissionType: {
      type: String,
      enum: ["online", "offline", "both"],
      default: "online",
    },

    allowLateSubmission: {
      type: Boolean,
      default: false,
    },

    lateSubmissionPenalty: {
      type: Number,
      min: [0, "Late submission penalty cannot be negative"],
      max: [100, "Late submission penalty cannot exceed 100%"],
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published", "closed", "archived"],
      default: "draft",
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

// Validate due date is after assigned date
assignmentSchema.pre("validate", function(next) {
  if (this.assignedDate && this.dueDate) {
    if (this.assignedDate >= this.dueDate) {
      return next(new Error("Due date must be after assigned date"));
    }
  }
  next();
});

// Index for efficient queries
assignmentSchema.index({
  schoolId: 1,
  academicYearId: 1,
  classId: 1,
  sectionId: 1,
  dueDate: 1,
});

// Index for teacher assignments
assignmentSchema.index({
  teacherId: 1,
  assignedDate: -1,
});

// Index for subject assignments
assignmentSchema.index({
  subjectId: 1,
  status: 1,
  dueDate: 1,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
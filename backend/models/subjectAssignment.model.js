import mongoose from "mongoose";

const subjectAssignmentSchema = new mongoose.Schema(
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

    isPrimary: {
      type: Boolean,
      default: true,
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
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

// Unique assignment per teacher, class, section, and subject
subjectAssignmentSchema.index(
  {
    teacherId: 1,
    classId: 1,
    sectionId: 1,
    subjectId: 1,
    academicYearId: 1,
  },
  {
    unique: true,
  }
);

const SubjectAssignment = mongoose.model(
  "SubjectAssignment",
  subjectAssignmentSchema
);

export default SubjectAssignment;

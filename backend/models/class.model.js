import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
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

    name: {
      type: String,
      required: [true, "Class name is required"],
      trim: true,
      minlength: [1, "Class name must be at least 1 character"],
      maxlength: [50, "Class name cannot exceed 50 characters"],
    },

    code: {
      type: String,
      required: [true, "Class code is required"],
      trim: true,
      uppercase: true,
      minlength: [1, "Class code must be at least 1 character"],
      maxlength: [20, "Class code cannot exceed 20 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
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

// Prevent duplicate class codes within the same school and academic year
classSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
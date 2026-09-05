import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
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
      required: [true, "Section name is required"],
      trim: true,
      minlength: [1, "Section name must be at least 1 character"],
      maxlength: [50, "Section name cannot exceed 50 characters"],
    },

    code: {
      type: String,
      required: [true, "Section code is required"],
      trim: true,
      uppercase: true,
      minlength: [1, "Section code must be at least 1 character"],
      maxlength: [20, "Section code cannot exceed 20 characters"],
    },

    roomNumber: {
      type: String,
      trim: true,
      maxlength: [20, "Room number cannot exceed 20 characters"],
      default: "",
    },

    capacity: {
      type: Number,
      min: [1, "Capacity must be at least 1"],
      default: 30,
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

sectionSchema.index(
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

const Section = mongoose.model("Section", sectionSchema);

export default Section;
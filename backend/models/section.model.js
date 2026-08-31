import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
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
      required: [true, "Section name is required"],
      trim: true,
      minlength: [1, "Section name cannot be empty"],
      maxlength: [50, "Section name cannot exceed 50 characters"],
    },

    code: {
      type: String,
      required: [true, "Section code is required"],
      trim: true,
      uppercase: true,
      maxlength: [20, "Section code cannot exceed 20 characters"],
    },

    capacity: {
      type: Number,
      min: [1, "Section capacity must be at least 1"],
      default: 30,
    },

    roomNumber: {
      type: String,
      trim: true,
      maxlength: [20, "Room number cannot exceed 20 characters"],
      default: "",
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

// Prevent duplicate section name
// for the same school, academic year and class
sectionSchema.index(
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

// Prevent duplicate section code
// for the same school, academic year and class
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

// Validate section capacity
sectionSchema.pre("validate", function (next) {
  if (this.capacity !== undefined && this.capacity < 1) {
    return next(
      new Error("Section capacity must be greater than 0")
    );
  }

  next();
});

const Section = mongoose.model("Section", sectionSchema);

export default Section;
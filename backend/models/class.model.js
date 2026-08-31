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
      minlength: [1, "Class name cannot be empty"],
      maxlength: [50, "Class name cannot exceed 50 characters"],
    },

    code: {
      type: String,
      required: [true, "Class code is required"],
      trim: true,
      uppercase: true,
      maxlength: [20, "Class code cannot exceed 20 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    order: {
      type: Number,
      required: [true, "Class order is required"],
      min: [1, "Class order must be at least 1"],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Unique class code per school + academic year
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

// Unique class name per school + academic year
classSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

// Validate class order
classSchema.pre("validate", function (next) {
  if (this.order !== undefined && this.order < 1) {
    return next(
      new Error("Class order must be greater than 0")
    );
  }

  next();
});

const Class = mongoose.model("Class", classSchema);

export default Class;
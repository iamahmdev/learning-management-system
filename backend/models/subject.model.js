import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
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
      maxlength: [20, "Subject code cannot exceed 20 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    type: {
      type: String,
      enum: [
        "core",
        "elective",
        "optional",
        "extra_curricular",
      ],
      default: "core",
    },

    creditHours: {
      type: Number,
      min: [0, "Credit hours cannot be negative"],
      default: 0,
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

// Prevent duplicate subject name within the same school
subjectSchema.index(
  {
    schoolId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

// Prevent duplicate subject code within the same school
subjectSchema.index(
  {
    schoolId: 1,
    code: 1,
  },
  {
    unique: true,
  }
);

// Validate credit hours
subjectSchema.pre("validate", function (next) {
  if (this.creditHours !== undefined && this.creditHours < 0) {
    return next(
      new Error("Credit hours cannot be negative")
    );
  }

  next();
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
import mongoose from "mongoose";

const academicYearSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
    },

    name: {
      type: String,
      required: [true, "Academic year name is required"],
      trim: true,
      minlength: [4, "Academic year name must be at least 4 characters"],
      maxlength: [20, "Academic year name cannot exceed 20 characters"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Validate start date and end date
academicYearSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate) {
    if (this.startDate >= this.endDate) {
      return next(
        new Error("Start date must be before end date")
      );
    }
  }

  next();
});

// Prevent duplicate academic year for the same school
academicYearSchema.index(
  {
    schoolId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const AcademicYear = mongoose.model(
  "AcademicYear",
  academicYearSchema
);

export default AcademicYear;
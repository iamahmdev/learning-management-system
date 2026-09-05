import mongoose from "mongoose";

const academicYearSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    name: {
      type: String,
      required: [true, "Academic year name is required"],
      trim: true,
      minlength: [4, "Academic year name must be at least 4 characters"],
      maxlength: [50, "Academic year name cannot exceed 50 characters"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return !this.startDate || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },

    isCurrent: {
      type: Boolean,
      default: false,
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

// Prevent duplicate academic years for the same school
academicYearSchema.index(
  { schoolId: 1, name: 1 },
  { unique: true }
);

const AcademicYear = mongoose.model(
  "AcademicYear",
  academicYearSchema
);

export default AcademicYear;
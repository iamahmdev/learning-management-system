import mongoose from "mongoose";

const gradeSystemSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    systemName: {
      type: String,
      required: [true, "System name is required"],
      trim: true,
      maxlength: [100, "System name cannot exceed 100 characters"],
    },

    gradeType: {
      type: String,
      enum: ["percentage", "gpa", "cgpa", "letter", "points"],
      required: [true, "Grade type is required"],
    },

    grades: [
      {
        grade: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        minMarks: {
          type: Number,
          required: true,
          min: 0,
        },
        maxMarks: {
          type: Number,
          required: true,
          min: 0,
        },
        gradePoint: {
          type: Number,
          min: 0,
        },
        description: {
          type: String,
          trim: true,
        },
        remarks: {
          type: String,
          enum: ["excellent", "very-good", "good", "satisfactory", "needs-improvement", "fail"],
        },
      },
    ],

    isDefault: {
      type: Boolean,
      default: false,
    },

    applicableFor: {
      type: String,
      enum: ["all", "primary", "secondary", "higher-secondary"],
      default: "all",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
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

// Validate grade ranges
gradeSystemSchema.pre("validate", function (next) {
  if (this.grades && this.grades.length > 0) {
    for (let i = 0; i < this.grades.length; i++) {
      const grade = this.grades[i];
      if (grade.minMarks >= grade.maxMarks) {
        this.invalidate(
          `grades.${i}.maxMarks`,
          "Max marks must be greater than min marks"
        );
      }
    }
  }
  next();
});

const GradeSystem = mongoose.model("GradeSystem", gradeSystemSchema);

export default GradeSystem;

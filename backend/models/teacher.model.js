import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
    },

    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
      uppercase: true,
      maxlength: [30, "Employee ID cannot exceed 30 characters"],
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
      maxlength: [150, "Qualification cannot exceed 150 characters"],
    },

    specialization: {
      type: String,
      trim: true,
      maxlength: [150, "Specialization cannot exceed 150 characters"],
      default: "",
    },

    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },

    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      default: 0,
    },

    employmentType: {
      type: String,
      enum: [
        "full_time",
        "part_time",
        "contract",
        "temporary",
      ],
      default: "full_time",
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: 0,
    },

    emergencyContact: {
      name: {
        type: String,
        trim: true,
        maxlength: [100, "Emergency contact name cannot exceed 100 characters"],
        default: "",
      },

      relationship: {
        type: String,
        trim: true,
        maxlength: [50, "Relationship cannot exceed 50 characters"],
        default: "",
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "on_leave", "terminated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate employee ID within the same school
teacherSchema.index(
  {
    schoolId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

// Validate experience
teacherSchema.pre("validate", function (next) {
  if (this.experience !== undefined && this.experience < 0) {
    return next(
      new Error("Experience cannot be negative")
    );
  }

  next();
});

// Validate salary
teacherSchema.pre("validate", function (next) {
  if (this.salary !== undefined && this.salary < 0) {
    return next(
      new Error("Salary cannot be negative")
    );
  }

  next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
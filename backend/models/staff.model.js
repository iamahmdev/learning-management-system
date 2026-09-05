import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "Employee ID must be at least 2 characters"],
      maxlength: [30, "Employee ID cannot exceed 30 characters"],
    },

    department: {
      type: String,
      enum: [
        "administration",
        "accounts",
        "library",
        "laboratory",
        "sports",
        "transport",
        "security",
        "housekeeping",
        "it",
        "hr",
        "other",
      ],
      required: [true, "Department is required"],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },

    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"],
      default: "unknown",
    },

    qualification: {
      type: String,
      trim: true,
      maxlength: [200, "Qualification cannot exceed 200 characters"],
      default: "",
    },

    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      default: 0,
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: 0,
    },

    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      state: {
        type: String,
        trim: true,
        default: "",
      },
      country: {
        type: String,
        trim: true,
        default: "",
      },
      postalCode: {
        type: String,
        trim: true,
        default: "",
      },
    },

    emergencyContact: {
      name: {
        type: String,
        trim: true,
        default: "",
      },
      phone: {
        type: String,
        trim: true,
        default: "",
      },
      relation: {
        type: String,
        trim: true,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "resigned", "terminated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Employee ID unique within school
staffSchema.index(
  {
    schoolId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;

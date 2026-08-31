import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // =================================================
    // USER REFERENCE
    // =================================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // =================================================
    // SCHOOL REFERENCE
    // =================================================

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    // =================================================
    // EMPLOYMENT INFORMATION
    // =================================================

    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
      uppercase: true,
      maxlength: [50, "Employee ID cannot exceed 50 characters"],
      index: true,
    },

    department: {
      type: String,
      enum: [
        "administration",
        "accounts",
        "academics",
        "sports",
        "library",
        "laboratory",
        "maintenance",
        "security",
        "transport",
        "canteen",
        "medical",
        "it",
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

    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: 0,
    },

    // =================================================
    // PERSONAL INFORMATION
    // =================================================

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function(date) {
          return date < new Date();
        },
        message: "Date of birth must be in the past"
      }
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      default: "",
    },

    // =================================================
    // CONTACT INFORMATION
    // =================================================

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
        maxlength: [50, "Emergency contact relationship cannot exceed 50 characters"],
        default: "",
      },
      phone: {
        type: String,
        trim: true,
        maxlength: [20, "Emergency contact phone cannot exceed 20 characters"],
        default: "",
      },
    },

    address: {
      street: {
        type: String,
        trim: true,
        maxlength: [200, "Street address cannot exceed 200 characters"],
        default: "",
      },
      city: {
        type: String,
        trim: true,
        maxlength: [100, "City cannot exceed 100 characters"],
        default: "",
      },
      state: {
        type: String,
        trim: true,
        maxlength: [100, "State cannot exceed 100 characters"],
        default: "",
      },
      country: {
        type: String,
        trim: true,
        maxlength: [100, "Country cannot exceed 100 characters"],
        default: "",
      },
      zipCode: {
        type: String,
        trim: true,
        maxlength: [20, "Zip code cannot exceed 20 characters"],
        default: "",
      },
    },

    // =================================================
    // PROFESSIONAL INFORMATION
    // =================================================

    qualifications: [
      {
        degree: {
          type: String,
          trim: true,
          maxlength: [100, "Degree cannot exceed 100 characters"],
          required: true,
        },
        institution: {
          type: String,
          trim: true,
          maxlength: [200, "Institution cannot exceed 200 characters"],
          required: true,
        },
        year: {
          type: Number,
          min: [1900, "Year must be after 1900"],
          max: [new Date().getFullYear(), "Year cannot be in the future"],
          required: true,
        },
        percentage: {
          type: Number,
          min: [0, "Percentage cannot be negative"],
          max: [100, "Percentage cannot exceed 100"],
          default: 0,
        },
      },
    ],

    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      max: [60, "Experience cannot exceed 60 years"],
      default: 0,
    },

    // =================================================
    // SYSTEM FIELDS
    // =================================================

    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "terminated"],
      default: "active",
    },

    contractType: {
      type: String,
      enum: ["permanent", "contract", "part-time", "intern"],
      default: "permanent",
    },

    probationEndDate: {
      type: Date,
      default: null,
    },

    terminationDate: {
      type: Date,
      default: null,
    },

    terminationReason: {
      type: String,
      trim: true,
      maxlength: [500, "Termination reason cannot exceed 500 characters"],
      default: "",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [1000, "Remarks cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Validate joining date
staffSchema.pre("validate", function(next) {
  if (this.joiningDate && this.dateOfBirth) {
    const age = (this.joiningDate - this.dateOfBirth) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 18) {
      return next(new Error("Staff member must be at least 18 years old at joining"));
    }
  }
  next();
});

// Prevent duplicate employee IDs within the same school
staffSchema.index(
  {
    schoolId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

// Index for efficient queries
staffSchema.index({
  schoolId: 1,
  department: 1,
  status: 1,
});

staffSchema.index({
  schoolId: 1,
  joiningDate: -1,
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
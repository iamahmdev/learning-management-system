import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    // User Account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
      index: true,
    },

    // School
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    // Teacher Employee ID
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
      uppercase: true,
      minlength: [2, "Employee ID must be at least 2 characters"],
      maxlength: [30, "Employee ID cannot exceed 30 characters"],
    },

    // Qualification
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
      minlength: [2, "Qualification must be at least 2 characters"],
      maxlength: [150, "Qualification cannot exceed 150 characters"],
    },

    // Specialization
    specialization: {
      type: String,
      trim: true,
      maxlength: [150, "Specialization cannot exceed 150 characters"],
      default: "",
    },

    // Date of Joining
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },

    // Employment Type
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time",
    },

    // Salary
    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      default: 0,
    },

    // Status
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Unique Employee ID per School
teacherSchema.index(
  {
    schoolId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
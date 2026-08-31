import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC USER INFORMATION
    // =====================================================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      select: false,
    },

    // =====================================================
    // PASSWORD RESET
    // =====================================================

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    // =====================================================
    // USER ROLE
    // =====================================================

    role: {
      type: String,
      enum: [
        "admin",
        "teacher",
        "student",
        "parent",
        "staff",
      ],
      default: "student",
    },

    // =====================================================
    // CONTACT INFORMATION
    // =====================================================

    phone: {
      type: String,
      trim: true,
      maxlength: [
        30,
        "Phone number cannot exceed 30 characters",
      ],
      default: "",
    },

    // =====================================================
    // PROFILE INFORMATION
    // =====================================================

    profile: {
      avatar: {
        type: String,
        default: "",
        trim: true,
      },

      dateOfBirth: {
        type: Date,
        default: null,
      },

      gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: null,
      },

      address: {
        type: String,
        trim: true,
        maxlength: [
          300,
          "Address cannot exceed 300 characters",
        ],
        default: "",
      },
    },

    // =====================================================
    // ACCOUNT STATUS
    // =====================================================

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// USER MODEL
// =====================================================

const User = mongoose.model("User", userSchema);

export default User;
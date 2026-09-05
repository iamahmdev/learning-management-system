import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "School name is required"],
      trim: true,
      minlength: [2, "School name must be at least 2 characters"],
      maxlength: [100, "School name cannot exceed 100 characters"],
    },

    code: {
      type: String,
      required: [true, "School code is required"],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: [2, "School code must be at least 2 characters"],
      maxlength: [20, "School code cannot exceed 20 characters"],
    },

    email: {
      type: String,
      required: [true, "School email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid school email",
      ],
    },

    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    address: {
      street: {
        type: String,
        trim: true,
        maxlength: [150, "Street cannot exceed 150 characters"],
      },

      city: {
        type: String,
        trim: true,
        maxlength: [50, "City cannot exceed 50 characters"],
      },

      state: {
        type: String,
        trim: true,
        maxlength: [50, "State cannot exceed 50 characters"],
      },

      country: {
        type: String,
        trim: true,
        maxlength: [50, "Country cannot exceed 50 characters"],
      },

      postalCode: {
        type: String,
        trim: true,
        maxlength: [20, "Postal code cannot exceed 20 characters"],
      },
    },

    website: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
      default: "",
    },

    principal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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

const School = mongoose.model("School", schoolSchema);

export default School;
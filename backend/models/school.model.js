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
      uppercase: true,
      trim: true,
      maxlength: [50, "School code cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "School email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "School phone number is required"],
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
    },
    address: {
      type: String,
      required: [true, "School address is required"],
      trim: true,
      maxlength: [300, "Address cannot exceed 300 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [100, "City cannot exceed 100 characters"],
    },
    state: {
      type: String,
      trim: true,
      maxlength: [100, "State cannot exceed 100 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    postalCode: {
      type: String,
      trim: true,
      maxlength: [20, "Postal code cannot exceed 20 characters"],
    },
    website: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    principal: {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please provide a valid principal email",
        ],
      },
      phone: {
        type: String,
        trim: true,
      },
    },
    establishedDate: {
      type: Date,
    },
    schoolType: {
      type: String,
      enum: {
        values: ["public", "private", "international", "other"],
        message: "School type must be public, private, international, or other",
      },
      default: "private",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Status must be active or inactive",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

schoolSchema.index({ code: 1 });
schoolSchema.index({ email: 1 });
schoolSchema.index({ status: 1 });
schoolSchema.index({ schoolType: 1 });

const School = mongoose.model("School", schoolSchema);

export default School;

import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    category: {
      type: String,
      enum: [
        "general",
        "academic",
        "attendance",
        "exam",
        "fee",
        "notification",
        "security",
        "other",
      ],
      required: [true, "Category is required"],
    },

    key: {
      type: String,
      required: [true, "Key is required"],
      trim: true,
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Value is required"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: false,
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

// Unique key per school
settingSchema.index(
  {
    schoolId: 1,
    key: 1,
  },
  {
    unique: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;

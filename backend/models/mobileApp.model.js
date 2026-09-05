import mongoose from "mongoose";

const mobileAppSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    deviceInfo: {
      deviceId: {
        type: String,
        required: true,
      },
      deviceType: {
        type: String,
        enum: ["ios", "android"],
        required: true,
      },
      deviceModel: String,
      osVersion: String,
      appVersion: String,
    },

    fcmToken: {
      type: String,
      index: true,
    },

    settings: {
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
      language: {
        type: String,
        default: "en",
      },
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "light",
      },
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },

    installDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index
mobileAppSchema.index({ userId: 1, deviceId: 1 }, { unique: true });

const MobileApp = mongoose.model("MobileApp", mobileAppSchema);

export default MobileApp;

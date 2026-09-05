import mongoose from "mongoose";

const studentPortalSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      language: {
        type: String,
        default: "en",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },

    portalAccess: {
      attendance: { type: Boolean, default: true },
      results: { type: Boolean, default: true },
      homework: { type: Boolean, default: true },
      library: { type: Boolean, default: true },
      timetable: { type: Boolean, default: true },
      onlineClasses: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      fees: { type: Boolean, default: true },
    },

    activityLog: [
      {
        action: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        module: String,
      },
    ],

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

const StudentPortal = mongoose.model("StudentPortal", studentPortalSchema);

export default StudentPortal;

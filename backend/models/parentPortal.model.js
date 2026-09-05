import mongoose from "mongoose";

const parentPortalSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
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
      notifications: {
        type: Boolean,
        default: true,
      },
      emailAlerts: {
        type: Boolean,
        default: true,
      },
      smsAlerts: {
        type: Boolean,
        default: false,
      },
    },

    accessibleStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    portalAccess: {
      attendance: { type: Boolean, default: true },
      results: { type: Boolean, default: true },
      fees: { type: Boolean, default: true },
      homework: { type: Boolean, default: true },
      library: { type: Boolean, default: true },
      timetable: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
    },

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

const ParentPortal = mongoose.model("ParentPortal", parentPortalSchema);

export default ParentPortal;

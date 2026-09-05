import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    action: {
      type: String,
      required: [true, "Action is required"],
      enum: [
        "create",
        "read",
        "update",
        "delete",
        "login",
        "logout",
        "approve",
        "reject",
        "other",
      ],
    },

    module: {
      type: String,
      required: [true, "Module is required"],
      index: true,
    },

    resourceType: {
      type: String,
      trim: true,
      default: "",
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ipAddress: {
      type: String,
      trim: true,
      default: "",
    },

    userAgent: {
      type: String,
      trim: true,
      default: "",
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Index for efficient querying
auditLogSchema.index({ schoolId: 1, module: 1, timestamp: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;

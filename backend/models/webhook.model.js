import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "POST",
    },

    headers: {
      type: Map,
      of: String,
    },

    events: [
      {
        type: String,
        enum: [
          "student.created",
          "student.updated",
          "attendance.marked",
          "fee.paid",
          "result.published",
          "homework.assigned",
          "exam.scheduled",
          "leave.requested",
          "admission.submitted",
          "parent.registered",
        ],
      },
    ],

    secret: {
      type: String,
      required: true,
    },

    retryPolicy: {
      maxRetries: {
        type: Number,
        default: 3,
      },
      retryDelay: {
        type: Number,
        default: 5000,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastTriggered: {
      type: Date,
    },

    successCount: {
      type: Number,
      default: 0,
    },

    failureCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "failed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Webhook = mongoose.model("Webhook", webhookSchema);

export default Webhook;

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      maxlength: [200, "Notification title cannot exceed 200 characters"],
    },

    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: [1000, "Notification message cannot exceed 1000 characters"],
    },

    type: {
      type: String,
      enum: [
        "general",
        "assignment",
        "exam",
        "result",
        "attendance",
        "fee",
        "event",
        "announcement",
        "reminder",
        "alert",
        "warning",
        "system",
      ],
      default: "general",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    actionUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Action URL cannot exceed 500 characters"],
      default: "",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deliveryMethod: {
      type: [String],
      enum: ["in-app", "email", "sms", "push"],
      default: ["in-app"],
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
notificationSchema.index({
  receiverId: 1,
  isRead: 1,
  sentAt: -1,
});

notificationSchema.index({
  schoolId: 1,
  type: 1,
  sentAt: -1,
});

notificationSchema.index({
  senderId: 1,
  sentAt: -1,
});

// Index for expired notifications cleanup
notificationSchema.index({
  expiresAt: 1,
}, {
  expireAfterSeconds: 0,
  partialFilterExpression: {
    expiresAt: { $exists: true, $ne: null }
  }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
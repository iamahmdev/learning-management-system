import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
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

    userRole: {
      type: String,
      required: true,
      enum: [
        "admin",
        "super_admin",
        "principal",
        "teacher",
        "student",
        "parent",
        "accountant",
        "librarian",
        "staff",
      ],
    },

    widgets: [
      {
        widgetId: String,
        name: String,
        type: String,
        position: {
          x: Number,
          y: Number,
        },
        size: {
          width: Number,
          height: Number,
        },
        isVisible: {
          type: Boolean,
          default: true,
        },
        settings: mongoose.Schema.Types.Mixed,
      },
    ],

    quickLinks: [
      {
        name: String,
        url: String,
        icon: String,
        order: Number,
      },
    ],

    recentActivities: [
      {
        activity: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        module: String,
      },
    ],

    preferences: {
      defaultView: String,
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      autoRefresh: {
        type: Boolean,
        default: false,
      },
      refreshInterval: {
        type: Number,
        default: 300000,
      },
    },

    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index
dashboardSchema.index({ userId: 1, schoolId: 1 }, { unique: true });

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      default: "",
    },

    eventType: {
      type: String,
      enum: [
        "academic",
        "cultural",
        "sports",
        "holiday",
        "exam",
        "parent-meeting",
        "workshop",
        "other",
      ],
      required: [true, "Event type is required"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    startTime: {
      type: String,
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:mm format",
      ],
      default: "",
    },

    endTime: {
      type: String,
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in HH:mm format",
      ],
      default: "",
    },

    venue: {
      type: String,
      trim: true,
      maxlength: [200, "Venue cannot exceed 200 characters"],
      default: "",
    },

    organizer: {
      type: String,
      trim: true,
      maxlength: [200, "Organizer cannot exceed 200 characters"],
      default: "",
    },

    targetAudience: {
      type: String,
      enum: ["all", "students", "parents", "teachers", "staff", "specific"],
      default: "all",
    },

    classIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],

    attachments: [
      {
        type: String,
        trim: true,
      },
    ],

    isHoliday: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Validation: endDate must be >= startDate
eventSchema.pre("validate", function (next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    this.invalidate("endDate", "End date must be on or after start date");
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

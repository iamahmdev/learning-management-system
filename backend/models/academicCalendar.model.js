import mongoose from "mongoose";

const academicCalendarSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
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
        "holiday",
        "exam",
        "vacation",
        "event",
        "parent-teacher-meeting",
        "sports-day",
        "cultural-event",
        "admission",
        "result-day",
        "other",
      ],
      required: [true, "Event type is required"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      index: true,
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    isHoliday: {
      type: Boolean,
      default: false,
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurrencePattern: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    color: {
      type: String,
      default: "#3B82F6",
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"],
    },

    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
      default: "",
    },

    organizer: {
      type: String,
      trim: true,
      maxlength: [200, "Organizer cannot exceed 200 characters"],
      default: "",
    },

    participants: [
      {
        type: String,
        enum: ["all", "students", "teachers", "staff", "parents"],
      },
    ],

    attachments: [
      {
        type: String,
        trim: true,
      },
    ],

    reminderDays: {
      type: Number,
      min: [0, "Reminder days cannot be negative"],
      default: 0,
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "postponed"],
      default: "scheduled",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [1000, "Remarks cannot exceed 1000 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user ID is required"],
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

// Validation: endDate must be >= startDate
academicCalendarSchema.pre("validate", function (next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    this.invalidate("endDate", "End date must be on or after start date");
  }
  next();
});

// Index for date range queries
academicCalendarSchema.index({ startDate: 1, endDate: 1 });

const AcademicCalendar = mongoose.model(
  "AcademicCalendar",
  academicCalendarSchema
);

export default AcademicCalendar;

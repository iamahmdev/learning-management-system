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
      maxlength: [200, "Event title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [2000, "Event description cannot exceed 2000 characters"],
    },

    eventType: {
      type: String,
      enum: [
        "academic",
        "sports",
        "cultural",
        "competition",
        "workshop",
        "seminar",
        "conference",
        "ceremony",
        "celebration",
        "meeting",
        "exam",
        "holiday",
        "other",
      ],
      default: "academic",
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
      validate: {
        validator: function(time) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: "Start time must be in HH:MM format (24-hour)"
      }
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
      trim: true,
      validate: {
        validator: function(time) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: "End time must be in HH:MM format (24-hour)"
      }
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organizer is required"],
      index: true,
    },

    targetAudience: {
      type: [String],
      enum: ["all", "students", "teachers", "parents", "staff", "admin"],
      default: ["all"],
    },

    maxParticipants: {
      type: Number,
      min: [1, "Maximum participants must be at least 1"],
      max: [10000, "Maximum participants cannot exceed 10000"],
      default: null,
    },

    registrationRequired: {
      type: Boolean,
      default: false,
    },

    registrationDeadline: {
      type: Date,
      default: null,
    },

    registrationFee: {
      type: Number,
      min: [0, "Registration fee cannot be negative"],
      default: 0,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed", "postponed"],
      default: "draft",
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    attachmentUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Attachment URL cannot exceed 500 characters"],
      default: "",
    },

    contactPerson: {
      name: {
        type: String,
        trim: true,
        maxlength: [100, "Contact person name cannot exceed 100 characters"],
        default: "",
      },
      phone: {
        type: String,
        trim: true,
        maxlength: [20, "Contact phone cannot exceed 20 characters"],
        default: "",
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [100, "Contact email cannot exceed 100 characters"],
        default: "",
      },
    },

    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, "Instructions cannot exceed 1000 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user ID is required"],
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurrencePattern: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: null,
    },

    recurrenceEnd: {
      type: Date,
      default: null,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Validate start time before end time
eventSchema.pre("validate", function(next) {
  if (this.startTime && this.endTime) {
    const [startHour, startMin] = this.startTime.split(':').map(Number);
    const [endHour, endMin] = this.endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    if (startMinutes >= endMinutes) {
      return next(new Error("Start time must be before end time"));
    }
  }

  if (this.registrationRequired && this.registrationDeadline) {
    if (this.registrationDeadline >= this.eventDate) {
      return next(new Error("Registration deadline must be before event date"));
    }
  }

  next();
});

// Index for efficient queries
eventSchema.index({
  schoolId: 1,
  eventDate: 1,
  status: 1,
});

eventSchema.index({
  schoolId: 1,
  eventType: 1,
  eventDate: -1,
});

eventSchema.index({
  organizer: 1,
  eventDate: -1,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
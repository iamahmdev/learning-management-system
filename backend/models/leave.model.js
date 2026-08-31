import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant ID is required"],
      index: true,
    },

    applicantType: {
      type: String,
      enum: ["student", "teacher", "staff", "parent"],
      required: [true, "Applicant type is required"],
      index: true,
    },

    leaveType: {
      type: String,
      enum: [
        "sick",
        "casual",
        "emergency",
        "medical",
        "personal",
        "maternity",
        "paternity",
        "bereavement",
        "vacation",
        "study",
        "other",
      ],
      required: [true, "Leave type is required"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    totalDays: {
      type: Number,
      required: [true, "Total days is required"],
      min: [1, "Total days must be at least 1"],
      max: [365, "Total days cannot exceed 365"],
    },

    reason: {
      type: String,
      required: [true, "Leave reason is required"],
      trim: true,
      maxlength: [500, "Leave reason cannot exceed 500 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },

    attachmentUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Attachment URL cannot exceed 500 characters"],
      default: "",
    },

    emergencyContact: {
      name: {
        type: String,
        trim: true,
        maxlength: [100, "Emergency contact name cannot exceed 100 characters"],
        default: "",
      },
      phone: {
        type: String,
        trim: true,
        maxlength: [20, "Emergency contact phone cannot exceed 20 characters"],
        default: "",
      },
      relationship: {
        type: String,
        trim: true,
        maxlength: [50, "Emergency contact relationship cannot exceed 50 characters"],
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
      index: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedDate: {
      type: Date,
      default: null,
    },

    approverRemarks: {
      type: String,
      trim: true,
      maxlength: [500, "Approver remarks cannot exceed 500 characters"],
      default: "",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    isHalfDay: {
      type: Boolean,
      default: false,
    },

    halfDayPeriod: {
      type: String,
      enum: ["morning", "afternoon"],
      default: null,
    },

    replacementArranged: {
      type: Boolean,
      default: false,
    },

    replacementTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    replacementInstructions: {
      type: String,
      trim: true,
      maxlength: [1000, "Replacement instructions cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Validate date range
leaveSchema.pre("validate", function(next) {
  if (this.startDate && this.endDate) {
    if (this.startDate > this.endDate) {
      return next(new Error("Start date cannot be after end date"));
    }

    // Calculate total days
    const timeDiff = this.endDate - this.startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    
    if (this.isHalfDay && daysDiff === 1) {
      this.totalDays = 0.5;
    } else {
      this.totalDays = daysDiff;
    }
  }

  // Validate half day settings
  if (this.isHalfDay && !this.halfDayPeriod) {
    return next(new Error("Half day period must be specified for half day leave"));
  }

  if (!this.isHalfDay && this.halfDayPeriod) {
    this.halfDayPeriod = null;
  }

  next();
});

// Index for efficient queries
leaveSchema.index({
  schoolId: 1,
  applicantId: 1,
  startDate: -1,
});

leaveSchema.index({
  schoolId: 1,
  applicantType: 1,
  status: 1,
});

leaveSchema.index({
  schoolId: 1,
  leaveType: 1,
  appliedDate: -1,
});

leaveSchema.index({
  approvedBy: 1,
  status: 1,
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
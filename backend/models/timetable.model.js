import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
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

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      index: true,
    },

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section ID is required"],
      index: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
      index: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher ID is required"],
      index: true,
    },

    day: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: [true, "Day is required"],
      lowercase: true,
      trim: true,
      index: true,
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:mm format",
      ],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in HH:mm format",
      ],
    },

    room: {
      type: String,
      trim: true,
      maxlength: [100, "Room cannot exceed 100 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      lowercase: true,
      index: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
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

// Validate that end time is after start time
timetableSchema.pre("validate", function () {
  if (this.startTime && this.endTime) {
    if (this.endTime <= this.startTime) {
      this.invalidate(
        "endTime",
        "End time must be after start time"
      );
    }
  }
});

// Prevent duplicate timetable slot for the same section
timetableSchema.index(
  {
    sectionId: 1,
    day: 1,
    startTime: 1,
  },
  {
    unique: true,
  }
);

// Prevent same teacher from being assigned to two slots
// at the same day and start time
timetableSchema.index(
  {
    teacherId: 1,
    day: 1,
    startTime: 1,
  },
  {
    unique: true,
  }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
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

    dayOfWeek: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      required: [true, "Day of week is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
      validate: {
        validator: function(time) {
          // Validate HH:MM format (24-hour)
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
          // Validate HH:MM format (24-hour)
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: "End time must be in HH:MM format (24-hour)"
      }
    },

    room: {
      type: String,
      required: [true, "Room is required"],
      trim: true,
      maxlength: [50, "Room cannot exceed 50 characters"],
    },

    periodNumber: {
      type: Number,
      required: [true, "Period number is required"],
      min: [1, "Period number must be at least 1"],
      max: [15, "Period number cannot exceed 15"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
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
timetableSchema.pre("validate", function(next) {
  if (this.startTime && this.endTime) {
    const [startHour, startMin] = this.startTime.split(':').map(Number);
    const [endHour, endMin] = this.endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    if (startMinutes >= endMinutes) {
      return next(new Error("Start time must be before end time"));
    }
  }
  next();
});

// Prevent duplicate timetable entries for same class, section, day, and time
timetableSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    classId: 1,
    sectionId: 1,
    dayOfWeek: 1,
    startTime: 1,
    endTime: 1,
  },
  {
    unique: true,
  }
);

// Prevent teacher conflicts (same teacher, same day, overlapping time)
timetableSchema.index({
  schoolId: 1,
  teacherId: 1,
  dayOfWeek: 1,
  startTime: 1,
  endTime: 1,
});

// Improve query performance
timetableSchema.index({
  schoolId: 1,
  academicYearId: 1,
  classId: 1,
  sectionId: 1,
  dayOfWeek: 1,
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    // School
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    // Academic Year
    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
      index: true,
    },

    // Class
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
      index: true,
    },

    // Section
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: [true, "Section ID is required"],
      index: true,
    },

    // Student
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    // Attendance Date
    date: {
      type: Date,
      required: [true, "Attendance date is required"],
      index: true,
    },

    // Attendance Status
    status: {
      type: String,
      enum: {
        values: ["present", "absent", "late", "leave"],
        message:
          "Attendance status must be present, absent, late, or leave",
      },
      required: [true, "Attendance status is required"],
      index: true,
    },

    // Check In Time
    checkInTime: {
      type: String,
      trim: true,
      default: "",
    },

    // Check Out Time
    checkOutTime: {
      type: String,
      trim: true,
      default: "",
    },

    // Remarks
    remarks: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Remarks cannot exceed 500 characters",
      ],
      default: "",
    },

    // User who marked attendance
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Marked by user ID is required"],
      index: true,
    },

    // Attendance record status
    statusType: {
      type: String,
      enum: {
        values: ["active", "cancelled"],
        message:
          "Status type must be active or cancelled",
      },
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ----------------------------------------------------
// Prevent duplicate attendance for the same student
// on the same date within the same school/year.
// ----------------------------------------------------

attendanceSchema.index(
  {
    schoolId: 1,
    academicYearId: 1,
    studentId: 1,
    date: 1,
  },
  {
    unique: true,
    name: "unique_student_daily_attendance",
  }
);

// ----------------------------------------------------
// Improve class attendance queries
// ----------------------------------------------------

attendanceSchema.index({
  schoolId: 1,
  classId: 1,
  sectionId: 1,
  date: 1,
});

// ----------------------------------------------------
// Improve student attendance history queries
// ----------------------------------------------------

attendanceSchema.index({
  studentId: 1,
  date: -1,
});

// ----------------------------------------------------
// Improve status-based attendance queries
// ----------------------------------------------------

attendanceSchema.index({
  schoolId: 1,
  date: 1,
  status: 1,
});

// ----------------------------------------------------
// Validate attendance data
// ----------------------------------------------------

attendanceSchema.pre("validate", function (next) {
  // Validate check-in and check-out relationship
  if (this.checkInTime && this.checkOutTime) {
    if (this.checkOutTime < this.checkInTime) {
      return next(
        new Error(
          "Check-out time cannot be before check-in time"
        )
      );
    }
  }

  // Check-in/check-out should not normally be
  // provided for absent or leave attendance.
  if (
    (this.status === "absent" ||
      this.status === "leave") &&
    (this.checkInTime || this.checkOutTime)
  ) {
    return next(
      new Error(
        "Check-in and check-out time are not allowed for absent or leave attendance"
      )
    );
  }

  next();
});

// ----------------------------------------------------
// Model
// ----------------------------------------------------

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;
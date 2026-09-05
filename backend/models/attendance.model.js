import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    date: {
      type: Date,
      required: [true, "Attendance date is required"],
      index: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "leave"],
      required: [true, "Attendance status is required"],
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

// Prevent duplicate attendance for the same student on the same date
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

// Useful index for daily/class attendance queries
attendanceSchema.index({
  schoolId: 1,
  academicYearId: 1,
  classId: 1,
  sectionId: 1,
  date: 1,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
import mongoose from "mongoose";

const teacherPortalSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      unique: true,
      index: true,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      defaultView: {
        type: String,
        enum: ["dashboard", "classes", "attendance"],
        default: "dashboard",
      },
    },

    portalAccess: {
      attendance: { type: Boolean, default: true },
      grading: { type: Boolean, default: true },
      homework: { type: Boolean, default: true },
      timetable: { type: Boolean, default: true },
      onlineClasses: { type: Boolean, default: true },
      studentRecords: { type: Boolean, default: true },
      reports: { type: Boolean, default: true },
    },

    assignedClasses: [
      {
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        },
        sectionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Section",
        },
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const TeacherPortal = mongoose.model("TeacherPortal", teacherPortalSchema);

export default TeacherPortal;

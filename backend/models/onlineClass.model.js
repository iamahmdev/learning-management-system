import mongoose from "mongoose";

const onlineClassSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 15,
    },

    meetingLink: {
      type: String,
      trim: true,
    },

    meetingId: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      trim: true,
    },

    platform: {
      type: String,
      enum: ["zoom", "google-meet", "microsoft-teams", "other"],
      default: "zoom",
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },

    recording: {
      url: String,
      duration: Number,
    },

    attendance: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        joinedAt: Date,
        leftAt: Date,
        duration: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OnlineClass = mongoose.model("OnlineClass", onlineClassSchema);

export default OnlineClass;

import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    incidentDate: {
      type: Date,
      required: true,
    },

    incidentType: {
      type: String,
      enum: [
        "late-arrival",
        "absence",
        "misbehavior",
        "violation",
        "fighting",
        "bullying",
        "other",
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: ["minor", "moderate", "major", "critical"],
      default: "minor",
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    action: {
      type: String,
      enum: [
        "warning",
        "detention",
        "suspension",
        "expulsion",
        "counseling",
        "parent-meeting",
        "other",
      ],
      required: true,
    },

    actionDate: {
      type: Date,
      default: Date.now,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["open", "resolved", "escalated"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Discipline = mongoose.model("Discipline", disciplineSchema);

export default Discipline;

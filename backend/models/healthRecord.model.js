import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
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

    recordType: {
      type: String,
      enum: ["checkup", "illness", "injury", "allergy", "vaccination", "medication", "other"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    symptoms: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    diagnosis: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    treatment: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    prescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    doctorName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    followUpDate: {
      type: Date,
    },

    documents: [String],

    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "resolved", "followup-required"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

export default HealthRecord;

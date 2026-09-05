import mongoose from "mongoose";

const biometricAttendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userType: {
      type: String,
      enum: ["student", "teacher", "staff"],
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
      trim: true,
    },

    biometricId: {
      type: String,
      required: true,
      trim: true,
    },

    checkInTime: {
      type: Date,
      required: true,
    },

    checkOutTime: {
      type: Date,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    location: {
      type: String,
      trim: true,
    },

    verificationMethod: {
      type: String,
      enum: ["fingerprint", "face", "iris", "rfid", "card"],
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "late", "early-departure", "absent"],
      default: "present",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

biometricAttendanceSchema.index({ userId: 1, date: 1 });

const BiometricAttendance = mongoose.model("BiometricAttendance", biometricAttendanceSchema);

export default BiometricAttendance;

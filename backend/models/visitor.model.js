import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    visitorName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    visitorPhone: {
      type: String,
      required: true,
      trim: true,
    },

    visitorEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    idProof: {
      type: String,
      trim: true,
    },

    purpose: {
      type: String,
      required: true,
      enum: [
        "meeting",
        "admission-inquiry",
        "parent-meeting",
        "vendor",
        "official",
        "other",
      ],
    },

    personToMeet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    checkInTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    checkOutTime: {
      type: Date,
    },

    vehicleNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["checked-in", "checked-out", "rejected"],
      default: "checked-in",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;

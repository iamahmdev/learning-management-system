import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema(
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

    cardNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    cardTemplate: {
      type: String,
      enum: ["standard", "premium", "custom"],
      default: "standard",
    },

    qrCode: {
      type: String,
      trim: true,
    },

    barcode: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "expired", "lost", "damaged", "revoked"],
      default: "active",
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const IDCard = mongoose.model("IDCard", idCardSchema);

export default IDCard;

import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    certificateType: {
      type: String,
      enum: [
        "character",
        "transfer",
        "bonafide",
        "completion",
        "achievement",
        "participation",
        "other",
      ],
      required: [true, "Certificate type is required"],
    },

    certificateNumber: {
      type: String,
      required: [true, "Certificate number is required"],
      trim: true,
      uppercase: true,
      unique: true,
    },

    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
      default: Date.now,
    },

    purpose: {
      type: String,
      trim: true,
      maxlength: [200, "Purpose cannot exceed 200 characters"],
      default: "",
    },

    content: {
      type: String,
      trim: true,
      maxlength: [2000, "Content cannot exceed 2000 characters"],
      default: "",
    },

    status: {
      type: String,
      enum: ["draft", "issued", "revoked"],
      default: "draft",
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Issued by is required"],
    },

    attachmentUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;

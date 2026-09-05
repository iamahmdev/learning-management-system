import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    feedbackType: {
      type: String,
      enum: ["suggestion", "appreciation", "concern", "improvement", "other"],
      required: true,
    },

    category: {
      type: String,
      enum: ["academic", "infrastructure", "staff", "transport", "fee", "events", "other"],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "acknowledged"],
      default: "pending",
    },

    response: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    respondedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;

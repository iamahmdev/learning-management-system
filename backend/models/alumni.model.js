import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
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
      unique: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    admissionNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    passoutYear: {
      type: Number,
      required: true,
    },

    lastClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },

    currentOccupation: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    designation: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    higherEducation: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    achievements: [
      {
        title: String,
        description: String,
        year: Number,
      },
    ],

    socialLinks: {
      linkedin: String,
      facebook: String,
      twitter: String,
      instagram: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Alumni = mongoose.model("Alumni", alumniSchema);

export default Alumni;

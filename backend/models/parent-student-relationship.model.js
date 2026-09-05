import mongoose from "mongoose";

const parentStudentRelationshipSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: [true, "Parent ID is required"],
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },

    relationship: {
      type: String,
      enum: [
        "father",
        "mother",
        "guardian",
        "grandfather",
        "grandmother",
        "other",
      ],
      required: [true, "Relationship is required"],
    },

    isPrimary: {
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

// Prevent duplicate Parent → Student relationship
parentStudentRelationshipSchema.index(
  {
    parentId: 1,
    studentId: 1,
  },
  {
    unique: true,
  }
);

const ParentStudentRelationship =
  mongoose.model(
    "ParentStudentRelationship",
    parentStudentRelationshipSchema
  );

export default ParentStudentRelationship;
import mongoose from "mongoose";

const questionBankSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    questionType: {
      type: String,
      enum: ["mcq", "true-false", "short-answer", "long-answer", "fill-blank"],
      required: true,
    },

    options: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],

    correctAnswer: {
      type: String,
      trim: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    topic: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    explanation: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
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

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);

export default QuestionBank;

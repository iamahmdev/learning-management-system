import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    metrics: {
      totalStudents: {
        type: Number,
        default: 0,
      },
      totalTeachers: {
        type: Number,
        default: 0,
      },
      totalStaff: {
        type: Number,
        default: 0,
      },
      presentStudents: {
        type: Number,
        default: 0,
      },
      absentStudents: {
        type: Number,
        default: 0,
      },
      attendanceRate: {
        type: Number,
        default: 0,
      },
      feeCollectionRate: {
        type: Number,
        default: 0,
      },
      outstandingFees: {
        type: Number,
        default: 0,
      },
      admissionsReceived: {
        type: Number,
        default: 0,
      },
      admissionsApproved: {
        type: Number,
        default: 0,
      },
      libraryBooksIssued: {
        type: Number,
        default: 0,
      },
      homeworkSubmitted: {
        type: Number,
        default: 0,
      },
      eventsScheduled: {
        type: Number,
        default: 0,
      },
    },

    performance: {
      averageScore: {
        type: Number,
        default: 0,
      },
      passPercentage: {
        type: Number,
        default: 0,
      },
      topPerformers: {
        type: Number,
        default: 0,
      },
    },

    financial: {
      totalRevenue: {
        type: Number,
        default: 0,
      },
      totalExpenses: {
        type: Number,
        default: 0,
      },
      netIncome: {
        type: Number,
        default: 0,
      },
    },

    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index
analyticsSchema.index(
  { schoolId: 1, academicYearId: 1, date: 1 },
  { unique: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;

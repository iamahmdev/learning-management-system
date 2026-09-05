import mongoose from "mongoose";

const transportRouteSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    routeName: {
      type: String,
      required: [true, "Route name is required"],
      trim: true,
      maxlength: [200, "Route name cannot exceed 200 characters"],
    },

    routeCode: {
      type: String,
      required: [true, "Route code is required"],
      trim: true,
      uppercase: true,
      maxlength: [50, "Route code cannot exceed 50 characters"],
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
      index: true,
    },

    startPoint: {
      type: String,
      required: [true, "Start point is required"],
      trim: true,
      maxlength: [200, "Start point cannot exceed 200 characters"],
    },

    endPoint: {
      type: String,
      required: [true, "End point is required"],
      trim: true,
      maxlength: [200, "End point cannot exceed 200 characters"],
    },

    stops: [
      {
        stopName: {
          type: String,
          required: true,
          trim: true,
        },
        stopTime: {
          type: String,
          required: true,
          match: [
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Stop time must be in HH:mm format",
          ],
        },
        pickupFee: {
          type: Number,
          default: 0,
          min: 0,
        },
        sequence: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalDistance: {
      type: Number,
      min: [0, "Distance cannot be negative"],
      default: 0,
    },

    estimatedDuration: {
      type: Number,
      min: [0, "Duration cannot be negative"],
      default: 0,
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:mm format",
      ],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in HH:mm format",
      ],
    },

    daysOfWeek: [
      {
        type: String,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
    ],

    monthlyFee: {
      type: Number,
      default: 0,
      min: [0, "Monthly fee cannot be negative"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [1000, "Remarks cannot exceed 1000 characters"],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user ID is required"],
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Unique route code per school
transportRouteSchema.index(
  {
    schoolId: 1,
    routeCode: 1,
  },
  {
    unique: true,
  }
);

const TransportRoute = mongoose.model("TransportRoute", transportRouteSchema);

export default TransportRoute;

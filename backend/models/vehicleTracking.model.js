import mongoose from "mongoose";

const vehicleTrackingSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport",
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    speed: {
      type: Number,
      min: 0,
    },

    heading: {
      type: Number,
      min: 0,
      max: 360,
    },

    address: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["moving", "stopped", "idle", "breakdown"],
      default: "moving",
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },

    odometer: {
      type: Number,
      min: 0,
    },

    fuelLevel: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: false,
  }
);

vehicleTrackingSchema.index({ location: "2dsphere" });
vehicleTrackingSchema.index({ vehicleId: 1, timestamp: -1 });

const VehicleTracking = mongoose.model("VehicleTracking", vehicleTrackingSchema);

export default VehicleTracking;

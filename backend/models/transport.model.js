import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
      index: true,
    },

    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
      trim: true,
      uppercase: true,
      maxlength: [50, "Vehicle number cannot exceed 50 characters"],
      index: true,
    },

    vehicleType: {
      type: String,
      enum: ["bus", "van", "coaster", "car", "other"],
      required: [true, "Vehicle type is required"],
      lowercase: true,
      trim: true,
    },

    routeName: {
      type: String,
      required: [true, "Route name is required"],
      trim: true,
      maxlength: [150, "Route name cannot exceed 150 characters"],
      index: true,
    },

    driverName: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
      maxlength: [100, "Driver name cannot exceed 100 characters"],
    },

    driverPhone: {
      type: String,
      required: [true, "Driver phone is required"],
      trim: true,
      maxlength: [20, "Driver phone cannot exceed 20 characters"],
    },

    pickupTime: {
      type: String,
      required: [true, "Pickup time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Pickup time must be in HH:mm format",
      ],
    },

    dropoffTime: {
      type: String,
      required: [true, "Drop-off time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Drop-off time must be in HH:mm format",
      ],
    },

    monthlyFee: {
      type: Number,
      default: 0,
      min: [0, "Monthly transport fee cannot be negative"],
    },

    capacity: {
      type: Number,
      required: [true, "Vehicle capacity is required"],
      min: [1, "Vehicle capacity must be at least 1"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
      lowercase: true,
      index: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
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

// Prevent duplicate vehicle numbers within the same school
transportSchema.index(
  {
    schoolId: 1,
    vehicleNumber: 1,
  },
  {
    unique: true,
  }
);

// Validate drop-off time
transportSchema.pre("validate", function () {
  if (this.pickupTime && this.dropoffTime) {
    if (this.dropoffTime <= this.pickupTime) {
      this.invalidate(
        "dropoffTime",
        "Drop-off time must be after pickup time"
      );
    }
  }
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;
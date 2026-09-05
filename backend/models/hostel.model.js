import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    hostelName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    hostelType: {
      type: String,
      enum: ["boys", "girls", "mixed"],
      required: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    totalRooms: {
      type: Number,
      required: true,
      min: 1,
    },

    totalBeds: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
      min: 0,
    },

    warden: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    facilities: [String],

    rules: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "under-maintenance"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;

import mongoose from "mongoose";

const hostelRoomSchema = new mongoose.Schema(
  {
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
      index: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
      min: 0,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    roomType: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      required: true,
    },

    facilities: [String],

    status: {
      type: String,
      enum: ["available", "full", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

hostelRoomSchema.index({ hostelId: 1, roomNumber: 1 }, { unique: true });

const HostelRoom = mongoose.model("HostelRoom", hostelRoomSchema);

export default HostelRoom;

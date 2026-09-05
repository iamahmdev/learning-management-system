import mongoose from "mongoose";

const canteenSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    itemCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    category: {
      type: String,
      enum: ["breakfast", "lunch", "snacks", "beverages", "dinner", "other"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isVegetarian: {
      type: Boolean,
      default: true,
    },

    availability: {
      type: String,
      enum: ["always", "weekdays", "weekends", "special"],
      default: "always",
    },

    status: {
      type: String,
      enum: ["available", "unavailable", "out-of-stock"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

canteenSchema.index({ schoolId: 1, itemCode: 1 }, { unique: true });

const Canteen = mongoose.model("Canteen", canteenSchema);

export default Canteen;

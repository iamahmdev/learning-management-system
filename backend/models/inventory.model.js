import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
      index: true,
    },

    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: [200, "Item name cannot exceed 200 characters"],
    },

    itemCode: {
      type: String,
      required: [true, "Item code is required"],
      trim: true,
      uppercase: true,
      maxlength: [50, "Item code cannot exceed 50 characters"],
    },

    category: {
      type: String,
      enum: [
        "furniture",
        "electronics",
        "stationery",
        "sports-equipment",
        "laboratory-equipment",
        "books",
        "cleaning-supplies",
        "other",
      ],
      required: [true, "Category is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },

    unitPrice: {
      type: Number,
      min: [0, "Unit price cannot be negative"],
      default: 0,
    },

    totalValue: {
      type: Number,
      min: [0, "Total value cannot be negative"],
      default: 0,
    },

    supplier: {
      type: String,
      trim: true,
      maxlength: [200, "Supplier name cannot exceed 200 characters"],
      default: "",
    },

    purchaseDate: {
      type: Date,
      default: null,
    },

    warrantyExpiry: {
      type: Date,
      default: null,
    },

    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
      default: "",
    },

    condition: {
      type: String,
      enum: ["new", "good", "fair", "poor", "damaged"],
      default: "new",
    },

    status: {
      type: String,
      enum: ["available", "in-use", "under-maintenance", "disposed"],
      default: "available",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Item code unique within school
inventorySchema.index(
  {
    schoolId: 1,
    itemCode: 1,
  },
  {
    unique: true,
  }
);

// Calculate total value before save
inventorySchema.pre("save", function (next) {
  this.totalValue = this.quantity * this.unitPrice;
  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;

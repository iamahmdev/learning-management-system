import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School ID is required"],
    },
    parentId: {
      type: String,
      required: [true, "Parent ID is required"],
      trim: true,
      maxlength: [30, "Parent ID cannot exceed 30 characters"],
    },
    relationship: {
      type: String,
      required: [true, "Relationship is required"],
      enum: {
        values: ["father", "mother", "guardian", "grandfather", "grandmother", "other"],
        message: "Relationship must be father, mother, guardian, grandfather, grandmother, or other",
      },
    },
    occupation: {
      type: String,
      trim: true,
      maxlength: [100, "Occupation cannot exceed 100 characters"],
      default: "",
    },
    nationalId: {
      type: String,
      trim: true,
      maxlength: [30, "National ID cannot exceed 30 characters"],
      default: "",
    },
    alternatePhone: {
      type: String,
      trim: true,
      maxlength: [30, "Alternate phone cannot exceed 30 characters"],
      default: "",
    },
    address: {
      street: {
        type: String,
        trim: true,
        maxlength: [200, "Street cannot exceed 200 characters"],
        default: "",
      },
      city: {
        type: String,
        trim: true,
        maxlength: [100, "City cannot exceed 100 characters"],
        default: "",
      },
      state: {
        type: String,
        trim: true,
        maxlength: [100, "State cannot exceed 100 characters"],
        default: "",
      },
      country: {
        type: String,
        trim: true,
        maxlength: [100, "Country cannot exceed 100 characters"],
        default: "",
      },
      postalCode: {
        type: String,
        trim: true,
        maxlength: [20, "Postal code cannot exceed 20 characters"],
        default: "",
      },
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Status must be active or inactive",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

parentSchema.index({ userId: 1 });
parentSchema.index({ schoolId: 1, parentId: 1 }, { unique: true });
parentSchema.index({ schoolId: 1 });
parentSchema.index({ status: 1 });

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;

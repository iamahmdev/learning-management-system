import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
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

    applicationNumber: {
      type: String,
      required: [true, "Application number is required"],
      trim: true,
      uppercase: true,
      unique: true,
    },

    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    classAppliedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class applied for is required"],
    },

    fatherName: {
      type: String,
      trim: true,
      maxlength: [100, "Father name cannot exceed 100 characters"],
      default: "",
    },

    motherName: {
      type: String,
      trim: true,
      maxlength: [100, "Mother name cannot exceed 100 characters"],
      default: "",
    },

    guardianPhone: {
      type: String,
      trim: true,
      required: [true, "Guardian phone is required"],
    },

    guardianEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    previousSchool: {
      type: String,
      trim: true,
      default: "",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "waitlisted", "admitted"],
      default: "pending",
      index: true,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
      default: "",
    },

    documents: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;

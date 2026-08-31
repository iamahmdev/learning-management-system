import mongoose from "mongoose";

// =====================================================
// ADDRESS SCHEMA
// =====================================================

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// GUARDIAN SCHEMA
// =====================================================

const guardianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    relationship: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    occupation: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// EMERGENCY CONTACT SCHEMA
// =====================================================

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    relationship: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// PREVIOUS SCHOOL SCHEMA
// =====================================================

const previousSchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    leavingDate: {
      type: Date,
    },

    reasonForLeaving: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// MEDICAL INFORMATION SCHEMA
// =====================================================

const medicalInformationSchema = new mongoose.Schema(
  {
    allergies: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    medicalConditions: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    medications: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    doctorName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    doctorPhone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// STUDENT SCHEMA
// =====================================================

const studentSchema = new mongoose.Schema(
  {
    // =================================================
    // USER
    // =================================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // =================================================
    // SCHOOL
    // =================================================

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    // =================================================
    // ACADEMIC YEAR
    // =================================================

    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
      index: true,
    },

    // =================================================
    // CLASS
    // =================================================

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },

    // =================================================
    // SECTION
    // =================================================

    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },

    // =================================================
    // ADMISSION NUMBER
    // =================================================

    admissionNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      index: true,
    },

    // =================================================
    // ROLL NUMBER
    // =================================================

    rollNumber: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    // =================================================
    // ADMISSION DATE
    // =================================================

    admissionDate: {
      type: Date,
      required: true,
    },

    // =================================================
    // DATE OF BIRTH
    // =================================================

    dateOfBirth: {
      type: Date,
      required: true,
    },

    // =================================================
    // GENDER
    // =================================================

    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "other"],
        message: "Invalid gender",
      },
      lowercase: true,
      trim: true,
    },

    // =================================================
    // BLOOD GROUP
    // =================================================

    bloodGroup: {
      type: String,
      enum: {
        values: [
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-",
          "unknown",
        ],
        message: "Invalid blood group",
      },
      default: "unknown",
    },

    // =================================================
    // NATIONALITY
    // =================================================

    nationality: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // =================================================
    // RELIGION
    // =================================================

    religion: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // =================================================
    // ADDRESS
    // =================================================

    address: {
      type: addressSchema,
    },

    // =================================================
    // GUARDIAN
    // =================================================

    guardian: {
      type: guardianSchema,
      required: true,
    },

    // =================================================
    // EMERGENCY CONTACT
    // =================================================

    emergencyContact: {
      type: emergencyContactSchema,
    },

    // =================================================
    // PREVIOUS SCHOOL
    // =================================================

    previousSchool: {
      type: previousSchoolSchema,
    },

    // =================================================
    // MEDICAL INFORMATION
    // =================================================

    medicalInformation: {
      type: medicalInformationSchema,
    },

    // =================================================
    // STUDENT STATUS
    // =================================================

    status: {
      type: String,
      enum: {
        values: [
          "active",
          "inactive",
          "graduated",
          "transferred",
          "suspended",
        ],
        message: "Invalid student status",
      },
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// =====================================================
// COMPOUND INDEXES
// =====================================================

// Admission number should be unique within a school.
studentSchema.index(
  {
    schoolId: 1,
    admissionNumber: 1,
  },
  {
    unique: true,
  }
);

// Helps with class/section based student queries.
studentSchema.index({
  schoolId: 1,
  academicYearId: 1,
  classId: 1,
  sectionId: 1,
});

// Helps with status based queries.
studentSchema.index({
  schoolId: 1,
  status: 1,
});

// =====================================================
// VALIDATION: ADMISSION DATE
// =====================================================

studentSchema.pre("validate", function (next) {
  if (
    this.admissionDate &&
    this.dateOfBirth &&
    this.admissionDate < this.dateOfBirth
  ) {
    return next(
      new Error(
        "Admission date cannot be before date of birth"
      )
    );
  }

  next();
});

// =====================================================
// EXPORT MODEL
// =====================================================

const Student = mongoose.model(
  "Student",
  studentSchema
);

export default Student;
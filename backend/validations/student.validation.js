import mongoose from "mongoose";

// =====================================================
// CONSTANTS
// =====================================================

const ALLOWED_GENDERS = ["male", "female", "other"];

const ALLOWED_BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "unknown",
];

const ALLOWED_STATUSES = [
  "active",
  "inactive",
  "graduated",
  "transferred",
  "expelled",
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Check MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validation error response
const validationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

// Valid email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Valid date
const isValidDate = (value) => {
  if (!value) return false;

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

// Check object
const isPlainObject = (value) => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

// =====================================================
// GUARDIAN VALIDATION HELPER
// =====================================================

const validateGuardian = (guardian, res) => {
  if (!isPlainObject(guardian)) {
    return validationError(
      res,
      "Guardian must be an object"
    );
  }

  // Guardian user
  if (
    guardian.user !== undefined &&
    guardian.user !== ""
  ) {
    if (!isValidObjectId(guardian.user)) {
      return validationError(
        res,
        "Invalid guardian user ID"
      );
    }
  }

  // Guardian name
  if (
    guardian.name !== undefined &&
    guardian.name !== ""
  ) {
    if (typeof guardian.name !== "string") {
      return validationError(
        res,
        "Guardian name must be a string"
      );
    }

    if (guardian.name.trim().length > 100) {
      return validationError(
        res,
        "Guardian name cannot exceed 100 characters"
      );
    }
  }

  // Guardian email
  if (
    guardian.email !== undefined &&
    guardian.email !== ""
  ) {
    if (
      typeof guardian.email !== "string" ||
      !isValidEmail(guardian.email.trim())
    ) {
      return validationError(
        res,
        "Please provide a valid guardian email"
      );
    }
  }

  // Guardian phone
  if (
    guardian.phone !== undefined &&
    guardian.phone !== ""
  ) {
    if (typeof guardian.phone !== "string") {
      return validationError(
        res,
        "Guardian phone must be a string"
      );
    }

    if (guardian.phone.trim().length > 30) {
      return validationError(
        res,
        "Guardian phone cannot exceed 30 characters"
      );
    }
  }

  // Guardian relation
  if (
    guardian.relation !== undefined &&
    guardian.relation !== ""
  ) {
    if (typeof guardian.relation !== "string") {
      return validationError(
        res,
        "Guardian relation must be a string"
      );
    }

    if (guardian.relation.trim().length > 50) {
      return validationError(
        res,
        "Guardian relation cannot exceed 50 characters"
      );
    }
  }

  return null;
};

// =====================================================
// CREATE STUDENT VALIDATION
// =====================================================

export const validateCreateStudent = (req, res, next) => {
  try {
    const {
      user,
      school,
      admissionNumber,
      rollNumber,
      class: classId,
      section,
      admissionDate,
      dateOfBirth,
      gender,
      bloodGroup,
      phone,
      address,
      guardian,
      status,
    } = req.body;

    // =================================================
    // USER
    // =================================================

    if (!user) {
      return validationError(
        res,
        "User ID is required"
      );
    }

    if (!isValidObjectId(user)) {
      return validationError(
        res,
        "Invalid user ID"
      );
    }

    // =================================================
    // SCHOOL
    // =================================================

    if (!school) {
      return validationError(
        res,
        "School ID is required"
      );
    }

    if (!isValidObjectId(school)) {
      return validationError(
        res,
        "Invalid school ID"
      );
    }

    // =================================================
    // ADMISSION NUMBER
    // =================================================

    if (
      typeof admissionNumber !== "string" ||
      !admissionNumber.trim()
    ) {
      return validationError(
        res,
        "Admission number is required"
      );
    }

    if (admissionNumber.trim().length > 50) {
      return validationError(
        res,
        "Admission number cannot exceed 50 characters"
      );
    }

    // =================================================
    // ROLL NUMBER
    // =================================================

    if (
      rollNumber !== undefined &&
      rollNumber !== null &&
      rollNumber !== ""
    ) {
      if (
        typeof rollNumber !== "string" &&
        typeof rollNumber !== "number"
      ) {
        return validationError(
          res,
          "Roll number must be a string or number"
        );
      }

      if (String(rollNumber).trim().length > 20) {
        return validationError(
          res,
          "Roll number cannot exceed 20 characters"
        );
      }
    }

    // =================================================
    // CLASS
    // =================================================

    if (!classId) {
      return validationError(
        res,
        "Class ID is required"
      );
    }

    if (!isValidObjectId(classId)) {
      return validationError(
        res,
        "Invalid class ID"
      );
    }

    // =================================================
    // SECTION
    // =================================================

    if (
      section !== undefined &&
      section !== null &&
      section !== ""
    ) {
      if (!isValidObjectId(section)) {
        return validationError(
          res,
          "Invalid section ID"
        );
      }
    }

    // =================================================
    // ADMISSION DATE
    // =================================================

    if (!admissionDate) {
      return validationError(
        res,
        "Admission date is required"
      );
    }

    if (!isValidDate(admissionDate)) {
      return validationError(
        res,
        "Invalid admission date"
      );
    }

    // =================================================
    // DATE OF BIRTH
    // =================================================

    if (!dateOfBirth) {
      return validationError(
        res,
        "Date of birth is required"
      );
    }

    if (!isValidDate(dateOfBirth)) {
      return validationError(
        res,
        "Invalid date of birth"
      );
    }

    // Admission date cannot be before DOB
    if (
      new Date(admissionDate) <
      new Date(dateOfBirth)
    ) {
      return validationError(
        res,
        "Admission date cannot be before date of birth"
      );
    }

    // =================================================
    // GENDER
    // =================================================

    if (!gender) {
      return validationError(
        res,
        "Gender is required"
      );
    }

    if (!ALLOWED_GENDERS.includes(gender)) {
      return validationError(
        res,
        "Invalid gender"
      );
    }

    // =================================================
    // BLOOD GROUP
    // =================================================

    if (
      bloodGroup !== undefined &&
      bloodGroup !== null &&
      bloodGroup !== ""
    ) {
      if (!ALLOWED_BLOOD_GROUPS.includes(bloodGroup)) {
        return validationError(
          res,
          "Invalid blood group"
        );
      }
    }

    // =================================================
    // PHONE
    // =================================================

    if (
      phone !== undefined &&
      phone !== null &&
      phone !== ""
    ) {
      if (typeof phone !== "string") {
        return validationError(
          res,
          "Phone number must be a string"
        );
      }

      if (phone.trim().length > 30) {
        return validationError(
          res,
          "Phone number cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (
      address !== undefined &&
      address !== null &&
      address !== ""
    ) {
      if (typeof address !== "string") {
        return validationError(
          res,
          "Address must be a string"
        );
      }

      if (address.trim().length > 300) {
        return validationError(
          res,
          "Address cannot exceed 300 characters"
        );
      }
    }

    // =================================================
    // GUARDIAN
    // =================================================

    if (guardian !== undefined && guardian !== null) {
      const guardianError = validateGuardian(
        guardian,
        res
      );

      if (guardianError) {
        return guardianError;
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (
      status !== undefined &&
      status !== null &&
      status !== ""
    ) {
      if (!ALLOWED_STATUSES.includes(status)) {
        return validationError(
          res,
          "Invalid student status"
        );
      }
    }

    // =================================================
    // SUCCESS
    // =================================================

    return next();
  } catch (error) {
    console.error(
      "Create Student Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Student validation failed",
    });
  }
};

// =====================================================
// UPDATE STUDENT VALIDATION
// =====================================================

export const validateUpdateStudent = (req, res, next) => {
  try {
    const { id } = req.params;

    // =================================================
    // STUDENT ID
    // =================================================

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid student ID"
      );
    }

    const {
      user,
      school,
      admissionNumber,
      rollNumber,
      class: classId,
      section,
      admissionDate,
      dateOfBirth,
      gender,
      bloodGroup,
      phone,
      address,
      guardian,
      status,
    } = req.body;

    // =================================================
    // USER
    // =================================================

    if (user !== undefined) {
      if (!isValidObjectId(user)) {
        return validationError(
          res,
          "Invalid user ID"
        );
      }
    }

    // =================================================
    // SCHOOL
    // =================================================

    if (school !== undefined) {
      if (!isValidObjectId(school)) {
        return validationError(
          res,
          "Invalid school ID"
        );
      }
    }

    // =================================================
    // ADMISSION NUMBER
    // =================================================

    if (admissionNumber !== undefined) {
      if (
        typeof admissionNumber !== "string" ||
        !admissionNumber.trim()
      ) {
        return validationError(
          res,
          "Admission number cannot be empty"
        );
      }

      if (admissionNumber.trim().length > 50) {
        return validationError(
          res,
          "Admission number cannot exceed 50 characters"
        );
      }
    }

    // =================================================
    // ROLL NUMBER
    // =================================================

    if (rollNumber !== undefined) {
      if (
        rollNumber !== null &&
        rollNumber !== "" &&
        typeof rollNumber !== "string" &&
        typeof rollNumber !== "number"
      ) {
        return validationError(
          res,
          "Roll number must be a string or number"
        );
      }

      if (
        rollNumber !== null &&
        rollNumber !== "" &&
        String(rollNumber).trim().length > 20
      ) {
        return validationError(
          res,
          "Roll number cannot exceed 20 characters"
        );
      }
    }

    // =================================================
    // CLASS
    // =================================================

    if (classId !== undefined) {
      if (!isValidObjectId(classId)) {
        return validationError(
          res,
          "Invalid class ID"
        );
      }
    }

    // =================================================
    // SECTION
    // =================================================

    if (
      section !== undefined &&
      section !== null &&
      section !== ""
    ) {
      if (!isValidObjectId(section)) {
        return validationError(
          res,
          "Invalid section ID"
        );
      }
    }

    // =================================================
    // ADMISSION DATE
    // =================================================

    if (
      admissionDate !== undefined &&
      admissionDate !== null &&
      admissionDate !== ""
    ) {
      if (!isValidDate(admissionDate)) {
        return validationError(
          res,
          "Invalid admission date"
        );
      }
    }

    // =================================================
    // DATE OF BIRTH
    // =================================================

    if (
      dateOfBirth !== undefined &&
      dateOfBirth !== null &&
      dateOfBirth !== ""
    ) {
      if (!isValidDate(dateOfBirth)) {
        return validationError(
          res,
          "Invalid date of birth"
        );
      }
    }

    // Validate dates only when both are supplied
    if (
      admissionDate &&
      dateOfBirth &&
      new Date(admissionDate) <
        new Date(dateOfBirth)
    ) {
      return validationError(
        res,
        "Admission date cannot be before date of birth"
      );
    }

    // =================================================
    // GENDER
    // =================================================

    if (gender !== undefined) {
      if (!ALLOWED_GENDERS.includes(gender)) {
        return validationError(
          res,
          "Invalid gender"
        );
      }
    }

    // =================================================
    // BLOOD GROUP
    // =================================================

    if (bloodGroup !== undefined) {
      if (
        bloodGroup !== "" &&
        bloodGroup !== null &&
        !ALLOWED_BLOOD_GROUPS.includes(bloodGroup)
      ) {
        return validationError(
          res,
          "Invalid blood group"
        );
      }
    }

    // =================================================
    // PHONE
    // =================================================

    if (phone !== undefined) {
      if (
        phone !== null &&
        phone !== "" &&
        typeof phone !== "string"
      ) {
        return validationError(
          res,
          "Phone number must be a string"
        );
      }

      if (
        typeof phone === "string" &&
        phone.trim().length > 30
      ) {
        return validationError(
          res,
          "Phone number cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (address !== undefined) {
      if (
        address !== null &&
        address !== "" &&
        typeof address !== "string"
      ) {
        return validationError(
          res,
          "Address must be a string"
        );
      }

      if (
        typeof address === "string" &&
        address.trim().length > 300
      ) {
        return validationError(
          res,
          "Address cannot exceed 300 characters"
        );
      }
    }

    // =================================================
    // GUARDIAN
    // =================================================

    if (guardian !== undefined && guardian !== null) {
      const guardianError = validateGuardian(
        guardian,
        res
      );

      if (guardianError) {
        return guardianError;
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (status !== undefined) {
      if (
        status !== "" &&
        status !== null &&
        !ALLOWED_STATUSES.includes(status)
      ) {
        return validationError(
          res,
          "Invalid student status"
        );
      }
    }

    // =================================================
    // SUCCESS
    // =================================================

    return next();
  } catch (error) {
    console.error(
      "Update Student Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Student validation failed",
    });
  }
};

// =====================================================
// STUDENT ID VALIDATION
// =====================================================

export const validateStudentId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid student ID"
      );
    }

    return next();
  } catch (error) {
    console.error(
      "Student ID Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Student ID validation failed",
    });
  }
};
import mongoose from "mongoose";

// =====================================================
// HELPERS
// =====================================================

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const validationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const allowedStatuses = ["active", "inactive"];

// =====================================================
// CREATE CLASS VALIDATION
// =====================================================

export const validateCreateClass = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      name,
      code,
      description,
      order,
      status,
    } = req.body;

    // School ID
    if (!schoolId) {
      return validationError(
        res,
        "School ID is required"
      );
    }

    if (!isValidObjectId(schoolId)) {
      return validationError(
        res,
        "Invalid School ID"
      );
    }

    // Academic Year ID
    if (!academicYearId) {
      return validationError(
        res,
        "Academic Year ID is required"
      );
    }

    if (!isValidObjectId(academicYearId)) {
      return validationError(
        res,
        "Invalid Academic Year ID"
      );
    }

    // Class Name
    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return validationError(
        res,
        "Class name is required"
      );
    }

    if (name.trim().length > 50) {
      return validationError(
        res,
        "Class name cannot exceed 50 characters"
      );
    }

    // Class Code
    if (
      typeof code !== "string" ||
      !code.trim()
    ) {
      return validationError(
        res,
        "Class code is required"
      );
    }

    if (code.trim().length > 20) {
      return validationError(
        res,
        "Class code cannot exceed 20 characters"
      );
    }

    // Description
    if (
      description !== undefined &&
      description !== null
    ) {
      if (typeof description !== "string") {
        return validationError(
          res,
          "Description must be a string"
        );
      }

      if (description.trim().length > 500) {
        return validationError(
          res,
          "Description cannot exceed 500 characters"
        );
      }
    }

    // Order
    if (order === undefined || order === null) {
      return validationError(
        res,
        "Class order is required"
      );
    }

    if (
      typeof order !== "number" ||
      !Number.isInteger(order) ||
      order < 1
    ) {
      return validationError(
        res,
        "Class order must be a positive integer"
      );
    }

    // Status
    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return validationError(
        res,
        "Invalid class status"
      );
    }

    next();
  } catch (error) {
    console.error(
      "Create Class Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Class validation failed",
    });
  }
};

// =====================================================
// UPDATE CLASS VALIDATION
// =====================================================

export const validateUpdateClass = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      name,
      code,
      description,
      order,
      status,
    } = req.body;

    // School ID
    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return validationError(
          res,
          "Invalid School ID"
        );
      }
    }

    // Academic Year ID
    if (academicYearId !== undefined) {
      if (!isValidObjectId(academicYearId)) {
        return validationError(
          res,
          "Invalid Academic Year ID"
        );
      }
    }

    // Class Name
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return validationError(
          res,
          "Class name cannot be empty"
        );
      }

      if (name.trim().length > 50) {
        return validationError(
          res,
          "Class name cannot exceed 50 characters"
        );
      }
    }

    // Class Code
    if (code !== undefined) {
      if (
        typeof code !== "string" ||
        !code.trim()
      ) {
        return validationError(
          res,
          "Class code cannot be empty"
        );
      }

      if (code.trim().length > 20) {
        return validationError(
          res,
          "Class code cannot exceed 20 characters"
        );
      }
    }

    // Description
    if (
      description !== undefined &&
      description !== null
    ) {
      if (typeof description !== "string") {
        return validationError(
          res,
          "Description must be a string"
        );
      }

      if (description.trim().length > 500) {
        return validationError(
          res,
          "Description cannot exceed 500 characters"
        );
      }
    }

    // Order
    if (order !== undefined) {
      if (
        typeof order !== "number" ||
        !Number.isInteger(order) ||
        order < 1
      ) {
        return validationError(
          res,
          "Class order must be a positive integer"
        );
      }
    }

    // Status
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return validationError(
          res,
          "Invalid class status"
        );
      }
    }

    next();
  } catch (error) {
    console.error(
      "Update Class Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Class validation failed",
    });
  }
};

// =====================================================
// CLASS ID VALIDATION
// =====================================================

export const validateClassId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid class ID"
      );
    }

    next();
  } catch (error) {
    console.error(
      "Class ID Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Class ID validation failed",
    });
  }
};
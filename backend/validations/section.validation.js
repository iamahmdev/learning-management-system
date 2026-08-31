import mongoose from "mongoose";

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Allowed section statuses
const allowedStatuses = ["active", "inactive"];

// Validate Create Section
export const validateCreateSection = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      capacity,
      roomNumber,
      description,
      status,
    } = req.body;

    // School ID
    if (!schoolId) {
      return res.status(400).json({
        success: false,
        message: "School ID is required",
      });
    }

    if (!isValidObjectId(schoolId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid School ID",
      });
    }

    // Academic Year ID
    if (!academicYearId) {
      return res.status(400).json({
        success: false,
        message: "Academic Year ID is required",
      });
    }

    if (!isValidObjectId(academicYearId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Academic Year ID",
      });
    }

    // Class ID
    if (!classId) {
      return res.status(400).json({
        success: false,
        message: "Class ID is required",
      });
    }

    if (!isValidObjectId(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Class ID",
      });
    }

    // Section Name
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Section name is required",
      });
    }

    if (name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        message: "Section name cannot exceed 50 characters",
      });
    }

    // Section Code
    if (!code?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Section code is required",
      });
    }

    if (code.trim().length > 20) {
      return res.status(400).json({
        success: false,
        message: "Section code cannot exceed 20 characters",
      });
    }

    // Capacity
    if (capacity !== undefined && capacity !== null) {
      if (
        typeof capacity !== "number" ||
        !Number.isInteger(capacity) ||
        capacity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Section capacity must be a positive integer",
        });
      }
    }

    // Room Number
    if (
      roomNumber !== undefined &&
      roomNumber !== null
    ) {
      if (typeof roomNumber !== "string") {
        return res.status(400).json({
          success: false,
          message: "Room number must be a string",
        });
      }

      if (roomNumber.length > 20) {
        return res.status(400).json({
          success: false,
          message: "Room number cannot exceed 20 characters",
        });
      }
    }

    // Description
    if (
      description !== undefined &&
      description !== null
    ) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.length > 500) {
        return res.status(400).json({
          success: false,
          message: "Description cannot exceed 500 characters",
        });
      }
    }

    // Status
    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid section status",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid section data",
      error: error.message,
    });
  }
};

// Validate Update Section
export const validateUpdateSection = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      name,
      code,
      capacity,
      roomNumber,
      description,
      status,
    } = req.body;

    // School ID
    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
    }

    // Academic Year ID
    if (academicYearId !== undefined) {
      if (!isValidObjectId(academicYearId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }
    }

    // Class ID
    if (classId !== undefined) {
      if (!isValidObjectId(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }
    }

    // Section Name
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Section name cannot be empty",
        });
      }

      if (name.trim().length > 50) {
        return res.status(400).json({
          success: false,
          message: "Section name cannot exceed 50 characters",
        });
      }
    }

    // Section Code
    if (code !== undefined) {
      if (
        typeof code !== "string" ||
        !code.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Section code cannot be empty",
        });
      }

      if (code.trim().length > 20) {
        return res.status(400).json({
          success: false,
          message: "Section code cannot exceed 20 characters",
        });
      }
    }

    // Capacity
    if (capacity !== undefined && capacity !== null) {
      if (
        typeof capacity !== "number" ||
        !Number.isInteger(capacity) ||
        capacity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Section capacity must be a positive integer",
        });
      }
    }

    // Room Number
    if (
      roomNumber !== undefined &&
      roomNumber !== null
    ) {
      if (typeof roomNumber !== "string") {
        return res.status(400).json({
          success: false,
          message: "Room number must be a string",
        });
      }

      if (roomNumber.length > 20) {
        return res.status(400).json({
          success: false,
          message: "Room number cannot exceed 20 characters",
        });
      }
    }

    // Description
    if (
      description !== undefined &&
      description !== null
    ) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      if (description.length > 500) {
        return res.status(400).json({
          success: false,
          message: "Description cannot exceed 500 characters",
        });
      }
    }

    // Status
    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid section status",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid section data",
      error: error.message,
    });
  }
};
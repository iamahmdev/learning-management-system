import mongoose from "mongoose";

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Allowed subject types
const allowedTypes = [
  "core",
  "elective",
  "optional",
  "extra_curricular",
];

// Allowed subject statuses
const allowedStatuses = ["active", "inactive"];

// Validate Create Subject
export const validateCreateSubject = (req, res, next) => {
  try {
    const {
      schoolId,
      name,
      code,
      description,
      type,
      creditHours,
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

    // Subject Name
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Subject name must be at least 2 characters",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Subject name cannot exceed 100 characters",
      });
    }

    // Subject Code
    if (!code?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject code is required",
      });
    }

    if (code.trim().length > 20) {
      return res.status(400).json({
        success: false,
        message: "Subject code cannot exceed 20 characters",
      });
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

    // Subject Type
    if (
      type !== undefined &&
      !allowedTypes.includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid subject type. Allowed values are core, elective, optional, extra_curricular",
      });
    }

    // Credit Hours
    if (
      creditHours !== undefined &&
      creditHours !== null
    ) {
      if (
        typeof creditHours !== "number" ||
        Number.isNaN(creditHours) ||
        creditHours < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Credit hours cannot be negative",
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
        message:
          "Invalid subject status. Allowed values are active or inactive",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid subject data",
      error: error.message,
    });
  }
};

// Validate Update Subject
export const validateUpdateSubject = (req, res, next) => {
  try {
    const {
      schoolId,
      name,
      code,
      description,
      type,
      creditHours,
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

    // Subject Name
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Subject name cannot be empty",
        });
      }

      if (name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Subject name must be at least 2 characters",
        });
      }

      if (name.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message:
            "Subject name cannot exceed 100 characters",
        });
      }
    }

    // Subject Code
    if (code !== undefined) {
      if (
        typeof code !== "string" ||
        !code.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Subject code cannot be empty",
        });
      }

      if (code.trim().length > 20) {
        return res.status(400).json({
          success: false,
          message:
            "Subject code cannot exceed 20 characters",
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
          message:
            "Description cannot exceed 500 characters",
        });
      }
    }

    // Subject Type
    if (type !== undefined) {
      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subject type. Allowed values are core, elective, optional, extra_curricular",
        });
      }
    }

    // Credit Hours
    if (
      creditHours !== undefined &&
      creditHours !== null
    ) {
      if (
        typeof creditHours !== "number" ||
        Number.isNaN(creditHours) ||
        creditHours < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Credit hours cannot be negative",
        });
      }
    }

    // Status
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subject status. Allowed values are active or inactive",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid subject data",
      error: error.message,
    });
  }
};
import mongoose from "mongoose";

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Allowed academic year statuses
const allowedStatuses = [
  "active",
  "inactive",
  "completed",
];

// Validate Create Academic Year
export const validateCreateAcademicYear = (req, res, next) => {
  try {
    const {
      schoolId,
      name,
      startDate,
      endDate,
      isCurrent,
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

    // Academic Year Name
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Academic year name is required",
      });
    }

    if (name.trim().length < 4) {
      return res.status(400).json({
        success: false,
        message:
          "Academic year name must be at least 4 characters",
      });
    }

    if (name.trim().length > 20) {
      return res.status(400).json({
        success: false,
        message:
          "Academic year name cannot exceed 20 characters",
      });
    }

    // Start Date
    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: "Start date is required",
      });
    }

    const parsedStartDate = new Date(startDate);

    if (Number.isNaN(parsedStartDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date",
      });
    }

    // End Date
    if (!endDate) {
      return res.status(400).json({
        success: false,
        message: "End date is required",
      });
    }

    const parsedEndDate = new Date(endDate);

    if (Number.isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid end date",
      });
    }

    // Date Relationship
    if (parsedStartDate >= parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Start date must be before end date",
      });
    }

    // isCurrent
    if (
      isCurrent !== undefined &&
      typeof isCurrent !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isCurrent must be a boolean",
      });
    }

    // Status
    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values are active, inactive, completed",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid academic year data",
      error: error.message,
    });
  }
};

// Validate Update Academic Year
export const validateUpdateAcademicYear = (req, res, next) => {
  try {
    const {
      schoolId,
      name,
      startDate,
      endDate,
      isCurrent,
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

    // Academic Year Name
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Academic year name cannot be empty",
        });
      }

      if (name.trim().length < 4) {
        return res.status(400).json({
          success: false,
          message:
            "Academic year name must be at least 4 characters",
        });
      }

      if (name.trim().length > 20) {
        return res.status(400).json({
          success: false,
          message:
            "Academic year name cannot exceed 20 characters",
        });
      }
    }

    // Start Date
    if (startDate !== undefined) {
      const parsedStartDate = new Date(startDate);

      if (Number.isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid start date",
        });
      }
    }

    // End Date
    if (endDate !== undefined) {
      const parsedEndDate = new Date(endDate);

      if (Number.isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid end date",
        });
      }
    }

    // Validate dates together when updating
    if (startDate !== undefined && endDate !== undefined) {
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (parsedStartDate >= parsedEndDate) {
        return res.status(400).json({
          success: false,
          message: "Start date must be before end date",
        });
      }
    }

    // isCurrent
    if (
      isCurrent !== undefined &&
      typeof isCurrent !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isCurrent must be a boolean",
      });
    }

    // Status
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values are active, inactive, completed",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid academic year data",
      error: error.message,
    });
  }
};
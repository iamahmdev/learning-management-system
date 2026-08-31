import mongoose from "mongoose";

// ----------------------------------------------------
// Allowed Attendance Statuses
// ----------------------------------------------------

const allowedAttendanceStatuses = [
  "present",
  "absent",
  "late",
  "leave",
];

// ----------------------------------------------------
// Allowed Record Status Types
// ----------------------------------------------------

const allowedStatusTypes = [
  "active",
  "cancelled",
];

// ----------------------------------------------------
// Validate MongoDB ObjectId
// ----------------------------------------------------

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// ----------------------------------------------------
// Validate Date
// ----------------------------------------------------

const isValidDate = (value) => {
  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

// ----------------------------------------------------
// Validate Time Format
// Expected format: HH:mm
// Example: 08:30, 14:45
// ----------------------------------------------------

const isValidTime = (value) => {
  if (typeof value !== "string") {
    return false;
  }

  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
};

// ----------------------------------------------------
// Validate Create Attendance
// ----------------------------------------------------

export const validateCreateAttendance = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
      markedBy,
      statusType,
    } = req.body;

    // ------------------------------------------------
    // School ID
    // ------------------------------------------------

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

    // ------------------------------------------------
    // Academic Year ID
    // ------------------------------------------------

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

    // ------------------------------------------------
    // Class ID
    // ------------------------------------------------

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

    // ------------------------------------------------
    // Section ID
    // ------------------------------------------------

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID is required",
      });
    }

    if (!isValidObjectId(sectionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Section ID",
      });
    }

    // ------------------------------------------------
    // Student ID
    // ------------------------------------------------

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    if (!isValidObjectId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    // ------------------------------------------------
    // Attendance Date
    // ------------------------------------------------

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Attendance date is required",
      });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance date",
      });
    }

    // ------------------------------------------------
    // Attendance Status
    // ------------------------------------------------

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Attendance status is required",
      });
    }

    if (!allowedAttendanceStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid attendance status. Allowed values are present, absent, late, leave",
      });
    }

    // ------------------------------------------------
    // Check-In Time
    // ------------------------------------------------

    if (checkInTime !== undefined && checkInTime !== "") {
      if (!isValidTime(checkInTime)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid check-in time. Use HH:mm format",
        });
      }
    }

    // ------------------------------------------------
    // Check-Out Time
    // ------------------------------------------------

    if (
      checkOutTime !== undefined &&
      checkOutTime !== ""
    ) {
      if (!isValidTime(checkOutTime)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid check-out time. Use HH:mm format",
        });
      }
    }

    // ------------------------------------------------
    // Check-In / Check-Out Relationship
    // ------------------------------------------------

    if (
      checkInTime &&
      checkOutTime &&
      checkOutTime < checkInTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out time cannot be before check-in time",
      });
    }

    // ------------------------------------------------
    // Absent / Leave Time Validation
    // ------------------------------------------------

    if (
      (status === "absent" || status === "leave") &&
      (checkInTime || checkOutTime)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-in and check-out time are not allowed for absent or leave attendance",
      });
    }

    // ------------------------------------------------
    // Remarks
    // ------------------------------------------------

    if (remarks !== undefined) {
      if (typeof remarks !== "string") {
        return res.status(400).json({
          success: false,
          message: "Remarks must be a string",
        });
      }

      if (remarks.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Remarks cannot exceed 500 characters",
        });
      }
    }

    // ------------------------------------------------
    // Marked By
    // ------------------------------------------------

    if (!markedBy) {
      return res.status(400).json({
        success: false,
        message: "Marked by user ID is required",
      });
    }

    if (!isValidObjectId(markedBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid marked by user ID",
      });
    }

    // ------------------------------------------------
    // Status Type
    // ------------------------------------------------

    if (
      statusType !== undefined &&
      !allowedStatusTypes.includes(statusType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status type. Allowed values are active, cancelled",
      });
    }

    // ------------------------------------------------
    // Continue
    // ------------------------------------------------

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid attendance data",
      error: error.message,
    });
  }
};

// ----------------------------------------------------
// Validate Update Attendance
// ----------------------------------------------------

export const validateUpdateAttendance = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      studentId,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
      markedBy,
      statusType,
    } = req.body;

    // ------------------------------------------------
    // School ID
    // ------------------------------------------------

    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
    }

    // ------------------------------------------------
    // Academic Year ID
    // ------------------------------------------------

    if (academicYearId !== undefined) {
      if (!isValidObjectId(academicYearId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }
    }

    // ------------------------------------------------
    // Class ID
    // ------------------------------------------------

    if (classId !== undefined) {
      if (!isValidObjectId(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }
    }

    // ------------------------------------------------
    // Section ID
    // ------------------------------------------------

    if (sectionId !== undefined) {
      if (!isValidObjectId(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Section ID",
        });
      }
    }

    // ------------------------------------------------
    // Student ID
    // ------------------------------------------------

    if (studentId !== undefined) {
      if (!isValidObjectId(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }
    }

    // ------------------------------------------------
    // Attendance Date
    // ------------------------------------------------

    if (date !== undefined) {
      if (!isValidDate(date)) {
        return res.status(400).json({
          success: false,
          message: "Invalid attendance date",
        });
      }
    }

    // ------------------------------------------------
    // Attendance Status
    // ------------------------------------------------

    if (status !== undefined) {
      if (
        !allowedAttendanceStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid attendance status. Allowed values are present, absent, late, leave",
        });
      }
    }

    // ------------------------------------------------
    // Check-In Time
    // ------------------------------------------------

    if (
      checkInTime !== undefined &&
      checkInTime !== ""
    ) {
      if (!isValidTime(checkInTime)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid check-in time. Use HH:mm format",
        });
      }
    }

    // ------------------------------------------------
    // Check-Out Time
    // ------------------------------------------------

    if (
      checkOutTime !== undefined &&
      checkOutTime !== ""
    ) {
      if (!isValidTime(checkOutTime)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid check-out time. Use HH:mm format",
        });
      }
    }

    // ------------------------------------------------
    // Check-In / Check-Out Relationship
    // ------------------------------------------------

    if (
      checkInTime &&
      checkOutTime &&
      checkOutTime < checkInTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out time cannot be before check-in time",
      });
    }

    // ------------------------------------------------
    // Absent / Leave Time Validation
    // ------------------------------------------------

    if (
      (status === "absent" || status === "leave") &&
      (checkInTime || checkOutTime)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-in and check-out time are not allowed for absent or leave attendance",
      });
    }

    // ------------------------------------------------
    // Remarks
    // ------------------------------------------------

    if (remarks !== undefined) {
      if (typeof remarks !== "string") {
        return res.status(400).json({
          success: false,
          message: "Remarks must be a string",
        });
      }

      if (remarks.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Remarks cannot exceed 500 characters",
        });
      }
    }

    // ------------------------------------------------
    // Marked By
    // ------------------------------------------------

    if (markedBy !== undefined) {
      if (!isValidObjectId(markedBy)) {
        return res.status(400).json({
          success: false,
          message: "Invalid marked by user ID",
        });
      }
    }

    // ------------------------------------------------
    // Status Type
    // ------------------------------------------------

    if (statusType !== undefined) {
      if (
        !allowedStatusTypes.includes(statusType)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status type. Allowed values are active, cancelled",
        });
      }
    }

    // ------------------------------------------------
    // Continue
    // ------------------------------------------------

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid attendance data",
      error: error.message,
    });
  }
};
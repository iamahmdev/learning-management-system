import mongoose from "mongoose";

// Allowed result statuses
const allowedStatuses = [
  "pass",
  "fail",
  "absent",
  "withheld",
  "incomplete",
];

// Allowed attendance statuses
const allowedAttendanceStatuses = [
  "present",
  "absent",
  "excused",
];

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Validate Create Result
export const validateCreateResult = (req, res, next) => {
  try {
    const {
      studentId,
      examId,
      subjectId,
      schoolId,
      classId,
      sectionId,
      academicYearId,
      totalMarks,
      passingMarks,
      obtainedMarks,
      grade,
      gradePoint,
      attendanceStatus,
      remarks,
      position,
      isPublished,
      publishedAt,
      createdBy,
    } = req.body;

    // Student ID
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

    // Exam ID
    if (!examId) {
      return res.status(400).json({
        success: false,
        message: "Exam ID is required",
      });
    }

    if (!isValidObjectId(examId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Exam ID",
      });
    }

    // Subject ID
    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Subject ID is required",
      });
    }

    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Subject ID",
      });
    }

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

    // Section ID
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

    // Total Marks
    if (totalMarks === undefined || totalMarks === null) {
      return res.status(400).json({
        success: false,
        message: "Total marks are required",
      });
    }

    if (
      typeof totalMarks !== "number" ||
      !Number.isFinite(totalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Total marks must be a valid number",
      });
    }

    if (totalMarks < 1) {
      return res.status(400).json({
        success: false,
        message: "Total marks must be greater than 0",
      });
    }

    // Passing Marks
    if (passingMarks === undefined || passingMarks === null) {
      return res.status(400).json({
        success: false,
        message: "Passing marks are required",
      });
    }

    if (
      typeof passingMarks !== "number" ||
      !Number.isFinite(passingMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Passing marks must be a valid number",
      });
    }

    if (passingMarks < 0) {
      return res.status(400).json({
        success: false,
        message: "Passing marks cannot be negative",
      });
    }

    if (passingMarks > totalMarks) {
      return res.status(400).json({
        success: false,
        message: "Passing marks cannot exceed total marks",
      });
    }

    // Obtained Marks
    if (
      obtainedMarks === undefined ||
      obtainedMarks === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks are required",
      });
    }

    if (
      typeof obtainedMarks !== "number" ||
      !Number.isFinite(obtainedMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks must be a valid number",
      });
    }

    if (obtainedMarks < 0) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks cannot be negative",
      });
    }

    if (obtainedMarks > totalMarks) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks cannot exceed total marks",
      });
    }

    // Grade
    if (grade !== undefined) {
      if (typeof grade !== "string") {
        return res.status(400).json({
          success: false,
          message: "Grade must be a string",
        });
      }

      if (grade.trim().length > 10) {
        return res.status(400).json({
          success: false,
          message: "Grade cannot exceed 10 characters",
        });
      }
    }

    // Grade Point
    if (gradePoint !== undefined) {
      if (
        typeof gradePoint !== "number" ||
        !Number.isFinite(gradePoint)
      ) {
        return res.status(400).json({
          success: false,
          message: "Grade point must be a valid number",
        });
      }

      if (gradePoint < 0) {
        return res.status(400).json({
          success: false,
          message: "Grade point cannot be negative",
        });
      }
    }

    // Attendance Status
    if (attendanceStatus !== undefined) {
      if (
        !allowedAttendanceStatuses.includes(attendanceStatus)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid attendance status. Allowed values are present, absent, excused",
        });
      }
    }

    // Remarks
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
          message: "Remarks cannot exceed 500 characters",
        });
      }
    }

    // Position
    if (position !== undefined && position !== null) {
      if (
        typeof position !== "number" ||
        !Number.isInteger(position)
      ) {
        return res.status(400).json({
          success: false,
          message: "Position must be a valid integer",
        });
      }

      if (position < 1) {
        return res.status(400).json({
          success: false,
          message: "Position must be at least 1",
        });
      }
    }

    // Published
    if (isPublished !== undefined) {
      if (typeof isPublished !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isPublished must be a boolean",
        });
      }
    }

    // Published At
    if (publishedAt !== undefined && publishedAt !== null) {
      const parsedPublishedAt = new Date(publishedAt);

      if (Number.isNaN(parsedPublishedAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid published date",
        });
      }
    }

    // Created By
    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "Created by user ID is required",
      });
    }

    if (!isValidObjectId(createdBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid created by user ID",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid result data",
      error: error.message,
    });
  }
};

// Validate Update Result
export const validateUpdateResult = (req, res, next) => {
  try {
    const {
      studentId,
      examId,
      subjectId,
      schoolId,
      classId,
      sectionId,
      academicYearId,
      totalMarks,
      passingMarks,
      obtainedMarks,
      grade,
      gradePoint,
      status,
      attendanceStatus,
      remarks,
      position,
      isPublished,
      publishedAt,
      createdBy,
      updatedBy,
    } = req.body;

    // Student ID
    if (studentId !== undefined) {
      if (!isValidObjectId(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }
    }

    // Exam ID
    if (examId !== undefined) {
      if (!isValidObjectId(examId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Exam ID",
        });
      }
    }

    // Subject ID
    if (subjectId !== undefined) {
      if (!isValidObjectId(subjectId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Subject ID",
        });
      }
    }

    // School ID
    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
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

    // Section ID
    if (sectionId !== undefined) {
      if (!isValidObjectId(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Section ID",
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

    // Total Marks
    if (totalMarks !== undefined) {
      if (
        typeof totalMarks !== "number" ||
        !Number.isFinite(totalMarks)
      ) {
        return res.status(400).json({
          success: false,
          message: "Total marks must be a valid number",
        });
      }

      if (totalMarks < 1) {
        return res.status(400).json({
          success: false,
          message: "Total marks must be greater than 0",
        });
      }
    }

    // Passing Marks
    if (passingMarks !== undefined) {
      if (
        typeof passingMarks !== "number" ||
        !Number.isFinite(passingMarks)
      ) {
        return res.status(400).json({
          success: false,
          message: "Passing marks must be a valid number",
        });
      }

      if (passingMarks < 0) {
        return res.status(400).json({
          success: false,
          message: "Passing marks cannot be negative",
        });
      }
    }

    // Obtained Marks
    if (obtainedMarks !== undefined) {
      if (
        typeof obtainedMarks !== "number" ||
        !Number.isFinite(obtainedMarks)
      ) {
        return res.status(400).json({
          success: false,
          message: "Obtained marks must be a valid number",
        });
      }

      if (obtainedMarks < 0) {
        return res.status(400).json({
          success: false,
          message: "Obtained marks cannot be negative",
        });
      }
    }

    // Validate marks relationship when provided together
    if (
      totalMarks !== undefined &&
      passingMarks !== undefined &&
      passingMarks > totalMarks
    ) {
      return res.status(400).json({
        success: false,
        message: "Passing marks cannot exceed total marks",
      });
    }

    if (
      totalMarks !== undefined &&
      obtainedMarks !== undefined &&
      obtainedMarks > totalMarks
    ) {
      return res.status(400).json({
        success: false,
        message: "Obtained marks cannot exceed total marks",
      });
    }

    // Grade
    if (grade !== undefined) {
      if (typeof grade !== "string") {
        return res.status(400).json({
          success: false,
          message: "Grade must be a string",
        });
      }

      if (grade.trim().length > 10) {
        return res.status(400).json({
          success: false,
          message: "Grade cannot exceed 10 characters",
        });
      }
    }

    // Grade Point
    if (gradePoint !== undefined) {
      if (
        typeof gradePoint !== "number" ||
        !Number.isFinite(gradePoint)
      ) {
        return res.status(400).json({
          success: false,
          message: "Grade point must be a valid number",
        });
      }

      if (gradePoint < 0) {
        return res.status(400).json({
          success: false,
          message: "Grade point cannot be negative",
        });
      }
    }

    // Status
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values are pass, fail, absent, withheld, incomplete",
        });
      }
    }

    // Attendance Status
    if (attendanceStatus !== undefined) {
      if (
        !allowedAttendanceStatuses.includes(attendanceStatus)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid attendance status. Allowed values are present, absent, excused",
        });
      }
    }

    // Remarks
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
          message: "Remarks cannot exceed 500 characters",
        });
      }
    }

    // Position
    if (position !== undefined && position !== null) {
      if (
        typeof position !== "number" ||
        !Number.isInteger(position)
      ) {
        return res.status(400).json({
          success: false,
          message: "Position must be a valid integer",
        });
      }

      if (position < 1) {
        return res.status(400).json({
          success: false,
          message: "Position must be at least 1",
        });
      }
    }

    // Published
    if (isPublished !== undefined) {
      if (typeof isPublished !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isPublished must be a boolean",
        });
      }
    }

    // Published At
    if (publishedAt !== undefined && publishedAt !== null) {
      const parsedPublishedAt = new Date(publishedAt);

      if (Number.isNaN(parsedPublishedAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid published date",
        });
      }
    }

    // Created By should not be changed
    if (createdBy !== undefined) {
      return res.status(400).json({
        success: false,
        message: "createdBy cannot be changed",
      });
    }

    // Updated By
    if (updatedBy !== undefined && updatedBy !== null) {
      if (!isValidObjectId(updatedBy)) {
        return res.status(400).json({
          success: false,
          message: "Invalid updated by user ID",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid result data",
      error: error.message,
    });
  }
};
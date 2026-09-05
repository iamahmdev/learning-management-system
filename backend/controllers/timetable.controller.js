import Timetable from "../models/timetable.model.js";

import {
  createTimetableValidation,
  updateTimetableValidation,
} from "../validations/timetable.validation.js";

// Create Timetable
export const createTimetable = async (req, res) => {
  try {
    const { error, value } = createTimetableValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    if (value.endTime <= value.startTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const timetable = await Timetable.create({
      ...value,
      createdBy:
        req.user?._id ||
        req.user?.id ||
        value.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Timetable created successfully",
      data: timetable,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Timetable slot already exists for this section or teacher at the selected day and start time",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create timetable",
      error: error.message,
    });
  }
};

// Get All Timetables
export const getAllTimetables = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) {
      filter.schoolId = req.query.schoolId;
    }

    if (req.query.academicYearId) {
      filter.academicYearId = req.query.academicYearId;
    }

    if (req.query.classId) {
      filter.classId = req.query.classId;
    }

    if (req.query.sectionId) {
      filter.sectionId = req.query.sectionId;
    }

    if (req.query.subjectId) {
      filter.subjectId = req.query.subjectId;
    }

    if (req.query.teacherId) {
      filter.teacherId = req.query.teacherId;
    }

    if (req.query.day) {
      filter.day = req.query.day;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const timetables = await Timetable.find(filter)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("classId", "name code")
      .populate("sectionId", "name code room")
      .populate("subjectId", "name code")
      .populate(
        "teacherId",
        "userId employeeId qualification specialization"
      )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({
        day: 1,
        startTime: 1,
      });

    return res.status(200).json({
      success: true,
      count: timetables.length,
      data: timetables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch timetables",
      error: error.message,
    });
  }
};

// Get Timetable By ID
export const getTimetableById = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("classId", "name code")
      .populate("sectionId", "name code room")
      .populate("subjectId", "name code")
      .populate(
        "teacherId",
        "userId employeeId qualification specialization"
      )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: timetable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch timetable",
      error: error.message,
    });
  }
};

// Update Timetable
export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateTimetableValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const existingTimetable = await Timetable.findById(id);

    if (!existingTimetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found",
      });
    }

    const startTime =
      value.startTime !== undefined
        ? value.startTime
        : existingTimetable.startTime;

    const endTime =
      value.endTime !== undefined
        ? value.endTime
        : existingTimetable.endTime;

    if (endTime <= startTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const timetable = await Timetable.findByIdAndUpdate(
      id,
      {
        ...value,
        startTime,
        endTime,
        updatedBy:
          req.user?._id ||
          req.user?.id ||
          value.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("classId", "name code")
      .populate("sectionId", "name code room")
      .populate("subjectId", "name code")
      .populate(
        "teacherId",
        "userId employeeId qualification specialization"
      )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Timetable updated successfully",
      data: timetable,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Timetable slot already exists for this section or teacher at the selected day and start time",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update timetable",
      error: error.message,
    });
  }
};

// Delete Timetable
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete timetable",
      error: error.message,
    });
  }
};
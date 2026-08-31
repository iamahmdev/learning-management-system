import mongoose from "mongoose";
import Timetable from "../models/timetable.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE TIMETABLE ENTRY
// =====================================================

export const createTimetable = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      subjectId,
      teacherId,
      dayOfWeek,
      startTime,
      endTime,
      room,
      periodNumber,
      status,
      remarks,
    } = req.body;

    // Create timetable entry
    const timetable = new Timetable({
      schoolId,
      academicYearId,
      classId,
      sectionId,
      subjectId,
      teacherId,
      dayOfWeek,
      startTime,
      endTime,
      room,
      periodNumber,
      status,
      remarks,
    });

    await timetable.save();

    // Populate references
    await timetable.populate([
      { path: "schoolId", select: "name" },
      { path: "academicYearId", select: "name" },
      { path: "classId", select: "name" },
      { path: "sectionId", select: "name" },
      { path: "subjectId", select: "name code" },
      { path: "teacherId", populate: { path: "userId", select: "name" } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Timetable entry created successfully",
      data: timetable,
    });
  } catch (error) {
    console.error("Create Timetable Error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Timetable entry already exists for this time slot",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create timetable entry",
    });
  }
};

// =====================================================
// GET ALL TIMETABLES
// =====================================================

export const getAllTimetables = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      teacherId,
      dayOfWeek,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    // Build filter
    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (academicYearId && isValidObjectId(academicYearId)) {
      filter.academicYearId = academicYearId;
    }

    if (classId && isValidObjectId(classId)) {
      filter.classId = classId;
    }

    if (sectionId && isValidObjectId(sectionId)) {
      filter.sectionId = sectionId;
    }

    if (teacherId && isValidObjectId(teacherId)) {
      filter.teacherId = teacherId;
    }

    if (dayOfWeek) {
      filter.dayOfWeek = dayOfWeek.toLowerCase();
    }

    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get timetables
    const timetables = await Timetable.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "academicYearId", select: "name" },
        { path: "classId", select: "name" },
        { path: "sectionId", select: "name" },
        { path: "subjectId", select: "name code" },
        { path: "teacherId", populate: { path: "userId", select: "name" } },
      ])
      .sort({ dayOfWeek: 1, startTime: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalCount = await Timetable.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Timetables retrieved successfully",
      count: timetables.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: timetables,
    });
  } catch (error) {
    console.error("Get All Timetables Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve timetables",
    });
  }
};

// =====================================================
// GET TIMETABLE BY ID
// =====================================================

export const getTimetableById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID format",
      });
    }

    // Find timetable
    const timetable = await Timetable.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "academicYearId", select: "name" },
        { path: "classId", select: "name" },
        { path: "sectionId", select: "name" },
        { path: "subjectId", select: "name code" },
        { path: "teacherId", populate: { path: "userId", select: "name" } },
      ]);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timetable entry retrieved successfully",
      data: timetable,
    });
  } catch (error) {
    console.error("Get Timetable By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve timetable entry",
    });
  }
};

// =====================================================
// UPDATE TIMETABLE
// =====================================================

export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID format",
      });
    }

    // Find and update timetable
    const timetable = await Timetable.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "academicYearId", select: "name" },
      { path: "classId", select: "name" },
      { path: "sectionId", select: "name" },
      { path: "subjectId", select: "name code" },
      { path: "teacherId", populate: { path: "userId", select: "name" } },
    ]);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timetable entry updated successfully",
      data: timetable,
    });
  } catch (error) {
    console.error("Update Timetable Error:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Timetable entry already exists for this time slot",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update timetable entry",
    });
  }
};

// =====================================================
// DELETE TIMETABLE
// =====================================================

export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID format",
      });
    }

    // Find and delete timetable
    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Timetable entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Timetable Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete timetable entry",
    });
  }
};

// =====================================================
// GET WEEKLY TIMETABLE
// =====================================================

export const getWeeklyTimetable = async (req, res) => {
  try {
    const { schoolId, academicYearId, classId, sectionId } = req.query;

    // Validate required fields
    if (!schoolId || !academicYearId || !classId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "School ID, Academic Year ID, Class ID, and Section ID are required",
      });
    }

    // Validate ObjectIds
    const ids = [schoolId, academicYearId, classId, sectionId];
    if (!ids.every(isValidObjectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format provided",
      });
    }

    // Get weekly timetable
    const timetables = await Timetable.find({
      schoolId,
      academicYearId,
      classId,
      sectionId,
      status: "active",
    })
      .populate([
        { path: "subjectId", select: "name code" },
        { path: "teacherId", populate: { path: "userId", select: "name" } },
      ])
      .sort({ dayOfWeek: 1, startTime: 1 });

    // Group by day of week
    const weeklySchedule = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    timetables.forEach(timetable => {
      weeklySchedule[timetable.dayOfWeek].push(timetable);
    });

    return res.status(200).json({
      success: true,
      message: "Weekly timetable retrieved successfully",
      data: weeklySchedule,
    });
  } catch (error) {
    console.error("Get Weekly Timetable Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve weekly timetable",
    });
  }
};
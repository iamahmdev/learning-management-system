import Attendance from "../models/attendance.model.js";

// ----------------------------------------------------
// Create Attendance
// ----------------------------------------------------

export const createAttendance = async (req, res) => {
  try {
    const attendanceData = {
      ...req.body,
      markedBy: req.user._id,
    };

    const attendance = await Attendance.create(
      attendanceData
    );

    const populatedAttendance =
      await Attendance.findById(attendance._id)
        .populate("schoolId", "name")
        .populate("academicYearId", "name")
        .populate("classId", "name")
        .populate("sectionId", "name")
        .populate("studentId", "name email")
        .populate("markedBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: populatedAttendance,
    });
  } catch (error) {
    console.error("Create Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

// ----------------------------------------------------
// Get All Attendance
// ----------------------------------------------------

export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("studentId", "name email")
      .populate("markedBy", "name email")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Attendance records fetched successfully",
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error("Get All Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// ----------------------------------------------------
// Get Attendance By ID
// ----------------------------------------------------

export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id)
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("studentId", "name email")
      .populate("markedBy", "name email");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record fetched successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Get Attendance By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance record",
      error: error.message,
    });
  }
};

// ----------------------------------------------------
// Update Attendance
// ----------------------------------------------------

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    // markedBy must not be changed through request body
    delete updateData.markedBy;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name")
      .populate("academicYearId", "name")
      .populate("classId", "name")
      .populate("sectionId", "name")
      .populate("studentId", "name email")
      .populate("markedBy", "name email");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record updated successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Update Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update attendance record",
      error: error.message,
    });
  }
};

// ----------------------------------------------------
// Delete Attendance
// ----------------------------------------------------

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance =
      await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Delete Attendance Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete attendance record",
      error: error.message,
    });
  }
};
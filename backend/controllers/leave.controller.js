import mongoose from "mongoose";
import Leave from "../models/leave.model.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE LEAVE APPLICATION
// =====================================================

export const createLeave = async (req, res) => {
  try {
    const leaveData = req.body;

    const leave = new Leave(leaveData);
    await leave.save();

    await leave.populate([
      { path: "schoolId", select: "name" },
      { path: "applicantId", select: "name email" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Create Leave Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create leave application",
    });
  }
};

// =====================================================
// GET ALL LEAVES
// =====================================================

export const getAllLeaves = async (req, res) => {
  try {
    const {
      schoolId,
      applicantId,
      applicantType,
      leaveType,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (applicantId && isValidObjectId(applicantId)) {
      filter.applicantId = applicantId;
    }

    if (applicantType) {
      filter.applicantType = applicantType;
    }

    if (leaveType) {
      filter.leaveType = leaveType;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const leaves = await Leave.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "applicantId", select: "name email" },
        { path: "approvedBy", select: "name" },
        { path: "replacementTeacherId", populate: { path: "userId", select: "name" } },
      ])
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Leave.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Leaves retrieved successfully",
      count: leaves.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: leaves,
    });
  } catch (error) {
    console.error("Get All Leaves Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve leaves",
    });
  }
};

// =====================================================
// GET LEAVE BY ID
// =====================================================

export const getLeaveById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave ID format",
      });
    }

    const leave = await Leave.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "applicantId", select: "name email" },
        { path: "approvedBy", select: "name" },
        { path: "replacementTeacherId", populate: { path: "userId", select: "name" } },
      ]);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave retrieved successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Get Leave By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve leave",
    });
  }
};

// =====================================================
// UPDATE LEAVE
// =====================================================

export const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave ID format",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "applicantId", select: "name email" },
      { path: "approvedBy", select: "name" },
      { path: "replacementTeacherId", populate: { path: "userId", select: "name" } },
    ]);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Update Leave Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update leave",
    });
  }
};

// =====================================================
// APPROVE/REJECT LEAVE
// =====================================================

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy, approverRemarks } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave ID format",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending leaves can be approved or rejected",
      });
    }

    leave.status = status;
    leave.approvedBy = approvedBy;
    leave.approvedDate = new Date();
    leave.approverRemarks = approverRemarks || "";

    await leave.save();

    await leave.populate([
      { path: "schoolId", select: "name" },
      { path: "applicantId", select: "name email" },
      { path: "approvedBy", select: "name" },
    ]);

    return res.status(200).json({
      success: true,
      message: `Leave ${status} successfully`,
      data: leave,
    });
  } catch (error) {
    console.error("Update Leave Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update leave status",
    });
  }
};

// =====================================================
// CANCEL LEAVE
// =====================================================

export const cancelLeave = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave ID format",
      });
    }

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found",
      });
    }

    if (leave.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Leave is already cancelled",
      });
    }

    leave.status = "cancelled";
    await leave.save();

    await leave.populate([
      { path: "schoolId", select: "name" },
      { path: "applicantId", select: "name email" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Cancel Leave Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel leave",
    });
  }
};

// =====================================================
// DELETE LEAVE
// =====================================================

export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave ID format",
      });
    }

    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    console.error("Delete Leave Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete leave",
    });
  }
};
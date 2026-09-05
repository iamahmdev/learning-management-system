import mongoose from "mongoose";
import Leave from "../models/leave.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js";

export const createLeave = async (req, res) => {
  try {
    const { schoolId, userId, userType, leaveType, startDate, endDate, totalDays, reason, attachments } = req.body;

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ success: false, message: "School not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const leave = await Leave.create({
      schoolId, userId, userType, leaveType, startDate, endDate, totalDays, reason, attachments,
    });

    await leave.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Leave request created successfully",
      leave,
    });
  } catch (error) {
    console.error("Create Leave Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create leave request", error: error.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const { schoolId, userId, userType, status } = req.query;
    const filter = {};

    if (schoolId) filter.schoolId = schoolId;
    if (userId) filter.userId = userId;
    if (userType) filter.userType = userType;
    if (status) filter.status = status;

    const leaves = await Leave.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .populate({ path: "approvedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Leaves fetched successfully",
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get All Leaves Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leaves", error: error.message });
  }
};

export const getLeaveById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Leave ID" });
    }

    const leave = await Leave.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .populate({ path: "approvedBy", select: "name email role" });

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Leave fetched successfully",
      leave,
    });
  } catch (error) {
    console.error("Get Leave By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leave", error: error.message });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy, remarks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Leave ID" });
    }

    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    leave.status = "approved";
    leave.approvedBy = approvedBy;
    leave.approvedDate = new Date();
    if (remarks) leave.remarks = remarks;

    await leave.save();

    await leave.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
      { path: "approvedBy", select: "name email role" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      leave,
    });
  } catch (error) {
    console.error("Approve Leave Error:", error);
    return res.status(500).json({ success: false, message: "Failed to approve leave", error: error.message });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy, rejectionReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Leave ID" });
    }

    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    leave.status = "rejected";
    leave.approvedBy = approvedBy;
    leave.approvedDate = new Date();
    if (rejectionReason) leave.rejectionReason = rejectionReason;

    await leave.save();

    await leave.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
      { path: "approvedBy", select: "name email role" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      leave,
    });
  } catch (error) {
    console.error("Reject Leave Error:", error);
    return res.status(500).json({ success: false, message: "Failed to reject leave", error: error.message });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Leave ID" });
    }

    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    console.error("Delete Leave Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete leave", error: error.message });
  }
};

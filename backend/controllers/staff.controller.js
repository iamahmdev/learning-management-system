import mongoose from "mongoose";
import Staff from "../models/staff.model.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createStaff = async (req, res) => {
  try {
    const staffData = req.body;

    const staff = new Staff(staffData);
    await staff.save();

    await staff.populate([
      { path: "userId", select: "name email phone role" },
      { path: "schoolId", select: "name" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Staff member created successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Create Staff Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Staff with this employee ID already exists",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create staff member",
    });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const {
      schoolId,
      department,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (department) {
      filter.department = department;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const staff = await Staff.find(filter)
      .populate([
        { path: "userId", select: "name email phone role" },
        { path: "schoolId", select: "name" },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Staff.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Staff retrieved successfully",
      count: staff.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: staff,
    });
  } catch (error) {
    console.error("Get All Staff Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve staff",
    });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID format",
      });
    }

    const staff = await Staff.findById(id)
      .populate([
        { path: "userId", select: "name email phone role" },
        { path: "schoolId", select: "name" },
      ]);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff member retrieved successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Get Staff By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve staff member",
    });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID format",
      });
    }

    const staff = await Staff.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "userId", select: "name email phone role" },
      { path: "schoolId", select: "name" },
    ]);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff member updated successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Update Staff Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Staff with this employee ID already exists",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update staff member",
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID format",
      });
    }

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error("Delete Staff Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete staff member",
    });
  }
};
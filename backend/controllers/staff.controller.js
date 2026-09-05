import mongoose from "mongoose";
import Staff from "../models/staff.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

export const createStaff = async (req, res) => {
  try {
    const { userId, schoolId, employeeId, department, designation, dateOfJoining, dateOfBirth, gender, bloodGroup, qualification, experience, salary, address, emergencyContact, status } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.role !== "staff") return res.status(400).json({ success: false, message: "User role must be staff" });

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const existingStaff = await Staff.findOne({ userId });
    if (existingStaff) return res.status(409).json({ success: false, message: "Staff profile already exists for this user" });

    const duplicateEmployeeId = await Staff.findOne({ schoolId, employeeId: employeeId.toUpperCase() });
    if (duplicateEmployeeId) return res.status(409).json({ success: false, message: "Employee ID already exists in this school" });

    const staff = await Staff.create({ userId, schoolId, employeeId, department, designation, dateOfJoining, dateOfBirth, gender, bloodGroup, qualification, experience, salary, address, emergencyContact, status });

    await staff.populate([
      { path: "userId", select: "name email role phone profile status" },
      { path: "schoolId", select: "name code email phone status" },
    ]);

    return res.status(201).json({ success: true, message: "Staff created successfully", staff });
  } catch (error) {
    console.error("Create Staff Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate staff record" });
    return res.status(500).json({ success: false, message: "Failed to create staff", error: error.message });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const { schoolId, department, status } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) return res.status(400).json({ success: false, message: "Invalid School ID" });
      filter.schoolId = schoolId;
    }
    if (department) filter.department = department;
    if (status) filter.status = status;

    const staff = await Staff.find(filter)
      .populate({ path: "userId", select: "name email role phone profile status" })
      .populate({ path: "schoolId", select: "name code email phone status" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Staff fetched successfully", count: staff.length, staff });
  } catch (error) {
    console.error("Get All Staff Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch staff", error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Staff ID" });

    const staff = await Staff.findById(id)
      .populate({ path: "userId", select: "name email role phone profile status" })
      .populate({ path: "schoolId", select: "name code email phone status" });

    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    return res.status(200).json({ success: true, message: "Staff fetched successfully", staff });
  } catch (error) {
    console.error("Get Staff By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch staff", error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Staff ID" });

    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    const updateData = req.body;
    Object.keys(updateData).forEach((key) => {
      staff[key] = updateData[key];
    });

    await staff.save();
    await staff.populate([
      { path: "userId", select: "name email role phone profile status" },
      { path: "schoolId", select: "name code email phone status" },
    ]);

    return res.status(200).json({ success: true, message: "Staff updated successfully", staff });
  } catch (error) {
    console.error("Update Staff Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate staff record" });
    return res.status(500).json({ success: false, message: "Failed to update staff", error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Staff ID" });

    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    return res.status(200).json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Delete Staff Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete staff", error: error.message });
  }
};

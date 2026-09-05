import mongoose from "mongoose";
import Alumni from "../models/alumni.model.js";

export const createAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    await alumni.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email" },
      { path: "lastClass", select: "name code" },
    ]);
    return res.status(201).json({ success: true, message: "Alumni created successfully", alumni });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Alumni already exists" });
    return res.status(500).json({ success: false, message: "Failed to create alumni", error: error.message });
  }
};

export const getAllAlumni = async (req, res) => {
  try {
    const { schoolId, passoutYear, isVerified } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (passoutYear) filter.passoutYear = passoutYear;
    if (isVerified !== undefined) filter.isVerified = isVerified === "true";

    const alumni = await Alumni.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email" })
      .populate({ path: "lastClass", select: "name code" })
      .sort({ passoutYear: -1 });

    return res.status(200).json({ success: true, count: alumni.length, alumni });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch alumni", error: error.message });
  }
};

export const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email" })
      .populate({ path: "lastClass", select: "name code" });
    if (!alumni) return res.status(404).json({ success: false, message: "Alumni not found" });
    return res.status(200).json({ success: true, alumni });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch alumni", error: error.message });
  }
};

export const updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email" })
      .populate({ path: "lastClass", select: "name code" });
    if (!alumni) return res.status(404).json({ success: false, message: "Alumni not found" });
    return res.status(200).json({ success: true, message: "Alumni updated successfully", alumni });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update alumni", error: error.message });
  }
};

export const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) return res.status(404).json({ success: false, message: "Alumni not found" });
    return res.status(200).json({ success: true, message: "Alumni deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete alumni", error: error.message });
  }
};

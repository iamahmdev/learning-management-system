import mongoose from "mongoose";
import Setting from "../models/setting.model.js";

export const createSetting = async (req, res) => {
  try {
    const { schoolId, category, key, value, description, isPublic, updatedBy } = req.body;

    const setting = await Setting.create({ schoolId, category, key, value, description, isPublic, updatedBy });

    await setting.populate({ path: "schoolId", select: "name code" });

    return res.status(201).json({ success: true, message: "Setting created successfully", setting });
  } catch (error) {
    console.error("Create Setting Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Setting key already exists for this school" });
    return res.status(500).json({ success: false, message: "Failed to create setting", error: error.message });
  }
};

export const getAllSettings = async (req, res) => {
  try {
    const { schoolId, category, isPublic } = req.query;
    const filter = {};

    if (schoolId) filter.schoolId = schoolId;
    if (category) filter.category = category;
    if (isPublic !== undefined) filter.isPublic = isPublic === "true";

    const settings = await Setting.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "updatedBy", select: "name email role" })
      .sort({ category: 1, key: 1 });

    return res.status(200).json({ success: true, message: "Settings fetched successfully", count: settings.length, settings });
  } catch (error) {
    console.error("Get All Settings Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch settings", error: error.message });
  }
};

export const getSettingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Setting ID" });

    const setting = await Setting.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "updatedBy", select: "name email role" });

    if (!setting) return res.status(404).json({ success: false, message: "Setting not found" });

    return res.status(200).json({ success: true, message: "Setting fetched successfully", setting });
  } catch (error) {
    console.error("Get Setting By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch setting", error: error.message });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Setting ID" });

    const setting = await Setting.findById(id);
    if (!setting) return res.status(404).json({ success: false, message: "Setting not found" });

    Object.keys(req.body).forEach((key) => {
      setting[key] = req.body[key];
    });

    await setting.save();
    await setting.populate([
      { path: "schoolId", select: "name code" },
      { path: "updatedBy", select: "name email role" },
    ]);

    return res.status(200).json({ success: true, message: "Setting updated successfully", setting });
  } catch (error) {
    console.error("Update Setting Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update setting", error: error.message });
  }
};

export const deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Setting ID" });

    const setting = await Setting.findByIdAndDelete(id);
    if (!setting) return res.status(404).json({ success: false, message: "Setting not found" });

    return res.status(200).json({ success: true, message: "Setting deleted successfully" });
  } catch (error) {
    console.error("Delete Setting Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete setting", error: error.message });
  }
};

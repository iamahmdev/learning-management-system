import mongoose from "mongoose";
import Communication from "../models/communication.model.js";
import School from "../models/school.model.js";

export const createCommunication = async (req, res) => {
  try {
    const { schoolId, title, message, communicationType, targetAudience, specificRecipients, classIds, sectionIds, priority, attachments, publishDate, expiryDate, status, createdBy } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const communication = await Communication.create({ schoolId, title, message, communicationType, targetAudience, specificRecipients, classIds, sectionIds, priority, attachments, publishDate, expiryDate, status, createdBy });

    await communication.populate([
      { path: "schoolId", select: "name code" },
      { path: "createdBy", select: "name email role" },
    ]);

    return res.status(201).json({ success: true, message: "Communication created successfully", communication });
  } catch (error) {
    console.error("Create Communication Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create communication", error: error.message });
  }
};

export const getAllCommunications = async (req, res) => {
  try {
    const { schoolId, communicationType, targetAudience, status } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) return res.status(400).json({ success: false, message: "Invalid School ID" });
      filter.schoolId = schoolId;
    }
    if (communicationType) filter.communicationType = communicationType;
    if (targetAudience) filter.targetAudience = targetAudience;
    if (status) filter.status = status;

    const communications = await Communication.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Communications fetched successfully", count: communications.length, communications });
  } catch (error) {
    console.error("Get All Communications Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch communications", error: error.message });
  }
};

export const getCommunicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Communication ID" });

    const communication = await Communication.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" });

    if (!communication) return res.status(404).json({ success: false, message: "Communication not found" });

    return res.status(200).json({ success: true, message: "Communication fetched successfully", communication });
  } catch (error) {
    console.error("Get Communication By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch communication", error: error.message });
  }
};

export const updateCommunication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Communication ID" });

    const communication = await Communication.findById(id);
    if (!communication) return res.status(404).json({ success: false, message: "Communication not found" });

    const updateData = req.body;
    Object.keys(updateData).forEach((key) => {
      communication[key] = updateData[key];
    });

    await communication.save();
    await communication.populate([
      { path: "schoolId", select: "name code" },
      { path: "createdBy", select: "name email role" },
    ]);

    return res.status(200).json({ success: true, message: "Communication updated successfully", communication });
  } catch (error) {
    console.error("Update Communication Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update communication", error: error.message });
  }
};

export const deleteCommunication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Communication ID" });

    const communication = await Communication.findByIdAndDelete(id);
    if (!communication) return res.status(404).json({ success: false, message: "Communication not found" });

    return res.status(200).json({ success: true, message: "Communication deleted successfully" });
  } catch (error) {
    console.error("Delete Communication Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete communication", error: error.message });
  }
};

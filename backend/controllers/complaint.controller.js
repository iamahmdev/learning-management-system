import Complaint from "../models/complaint.model.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    await complaint.populate([
      { path: "schoolId", select: "name code" },
      { path: "submittedBy", select: "name email role" },
      { path: "assignedTo", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Complaint created successfully", complaint });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate complaint number" });
    return res.status(500).json({ success: false, message: "Failed to create complaint", error: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const { schoolId, status, category } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (status) filter.status = status;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "assignedTo", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: complaints.length, complaints });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch complaints", error: error.message });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "assignedTo", select: "name email role" });
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    return res.status(200).json({ success: true, complaint });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch complaint", error: error.message });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "assignedTo", select: "name email role" });
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    return res.status(200).json({ success: true, message: "Complaint updated successfully", complaint });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update complaint", error: error.message });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    return res.status(200).json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete complaint", error: error.message });
  }
};

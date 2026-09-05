import Visitor from "../models/visitor.model.js";

export const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    await visitor.populate([
      { path: "schoolId", select: "name code" },
      { path: "personToMeet", select: "name email role" },
      { path: "approvedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Visitor created successfully", visitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create visitor", error: error.message });
  }
};

export const getAllVisitors = async (req, res) => {
  try {
    const { schoolId, purpose, status, visitDate } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (purpose) filter.purpose = purpose;
    if (status) filter.status = status;
    if (visitDate) filter.visitDate = { $gte: new Date(visitDate), $lt: new Date(new Date(visitDate).setDate(new Date(visitDate).getDate() + 1)) };

    const visitors = await Visitor.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "personToMeet", select: "name email role" })
      .populate({ path: "approvedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: visitors.length, visitors });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch visitors", error: error.message });
  }
};

export const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "personToMeet", select: "name email role" })
      .populate({ path: "approvedBy", select: "name email role" });
    if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
    return res.status(200).json({ success: true, visitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch visitor", error: error.message });
  }
};

export const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "personToMeet", select: "name email role" })
      .populate({ path: "approvedBy", select: "name email role" });
    if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
    return res.status(200).json({ success: true, message: "Visitor updated successfully", visitor });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update visitor", error: error.message });
  }
};

export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ success: false, message: "Visitor not found" });
    return res.status(200).json({ success: true, message: "Visitor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete visitor", error: error.message });
  }
};

import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    await feedback.populate([
      { path: "schoolId", select: "name code" },
      { path: "submittedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Feedback created successfully", feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create feedback", error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const { schoolId, feedbackType, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (feedbackType) filter.feedbackType = feedbackType;
    if (status) filter.status = status;

    const feedback = await Feedback.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "respondedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: feedback.length, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch feedback", error: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "respondedBy", select: "name email role" });
    if (!feedback) return res.status(404).json({ success: false, message: "Feedback not found" });
    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch feedback", error: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "submittedBy", select: "name email role" })
      .populate({ path: "respondedBy", select: "name email role" });
    if (!feedback) return res.status(404).json({ success: false, message: "Feedback not found" });
    return res.status(200).json({ success: true, message: "Feedback updated successfully", feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update feedback", error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ success: false, message: "Feedback not found" });
    return res.status(200).json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete feedback", error: error.message });
  }
};

import OnlineClass from "../models/onlineClass.model.js";

export const createOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.create(req.body);
    await onlineClass.populate([
      { path: "schoolId", select: "name code" },
      { path: "classId", select: "name code" },
      { path: "sectionId", select: "name code" },
      { path: "subjectId", select: "name code" },
      { path: "teacherId", populate: { path: "userId", select: "name email" } },
    ]);
    return res.status(201).json({ success: true, message: "Online class created successfully", onlineClass });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create online class", error: error.message });
  }
};

export const getAllOnlineClasses = async (req, res) => {
  try {
    const { schoolId, classId, sectionId, teacherId, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (classId) filter.classId = classId;
    if (sectionId) filter.sectionId = sectionId;
    if (teacherId) filter.teacherId = teacherId;
    if (status) filter.status = status;

    const onlineClasses = await OnlineClass.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "sectionId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } })
      .sort({ scheduledDate: -1 });

    return res.status(200).json({ success: true, count: onlineClasses.length, onlineClasses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch online classes", error: error.message });
  }
};

export const getOnlineClassById = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "sectionId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } });
    if (!onlineClass) return res.status(404).json({ success: false, message: "Online class not found" });
    return res.status(200).json({ success: true, onlineClass });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch online class", error: error.message });
  }
};

export const updateOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "sectionId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } });
    if (!onlineClass) return res.status(404).json({ success: false, message: "Online class not found" });
    return res.status(200).json({ success: true, message: "Online class updated successfully", onlineClass });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update online class", error: error.message });
  }
};

export const deleteOnlineClass = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findByIdAndDelete(req.params.id);
    if (!onlineClass) return res.status(404).json({ success: false, message: "Online class not found" });
    return res.status(200).json({ success: true, message: "Online class deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete online class", error: error.message });
  }
};

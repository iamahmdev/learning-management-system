import HealthRecord from "../models/healthRecord.model.js";

export const createHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.create(req.body);
    await healthRecord.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "recordedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Health record created successfully", healthRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create health record", error: error.message });
  }
};

export const getAllHealthRecords = async (req, res) => {
  try {
    const { schoolId, studentId, recordType, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (studentId) filter.studentId = studentId;
    if (recordType) filter.recordType = recordType;
    if (status) filter.status = status;

    const healthRecords = await HealthRecord.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "recordedBy", select: "name email role" })
      .sort({ date: -1 });

    return res.status(200).json({ success: true, count: healthRecords.length, healthRecords });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch health records", error: error.message });
  }
};

export const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "recordedBy", select: "name email role" });
    if (!healthRecord) return res.status(404).json({ success: false, message: "Health record not found" });
    return res.status(200).json({ success: true, healthRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch health record", error: error.message });
  }
};

export const updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "recordedBy", select: "name email role" });
    if (!healthRecord) return res.status(404).json({ success: false, message: "Health record not found" });
    return res.status(200).json({ success: true, message: "Health record updated successfully", healthRecord });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update health record", error: error.message });
  }
};

export const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!healthRecord) return res.status(404).json({ success: false, message: "Health record not found" });
    return res.status(200).json({ success: true, message: "Health record deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete health record", error: error.message });
  }
};

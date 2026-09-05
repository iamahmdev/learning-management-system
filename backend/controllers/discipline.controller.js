import Discipline from "../models/discipline.model.js";

export const createDiscipline = async (req, res) => {
  try {
    const discipline = await Discipline.create(req.body);
    await discipline.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "reportedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Discipline record created successfully", discipline });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create discipline record", error: error.message });
  }
};

export const getAllDisciplines = async (req, res) => {
  try {
    const { schoolId, studentId, incidentType, severity, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (studentId) filter.studentId = studentId;
    if (incidentType) filter.incidentType = incidentType;
    if (severity) filter.severity = severity;
    if (status) filter.status = status;

    const disciplines = await Discipline.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "reportedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: disciplines.length, disciplines });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch discipline records", error: error.message });
  }
};

export const getDisciplineById = async (req, res) => {
  try {
    const discipline = await Discipline.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "reportedBy", select: "name email role" });
    if (!discipline) return res.status(404).json({ success: false, message: "Discipline record not found" });
    return res.status(200).json({ success: true, discipline });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch discipline record", error: error.message });
  }
};

export const updateDiscipline = async (req, res) => {
  try {
    const discipline = await Discipline.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "reportedBy", select: "name email role" });
    if (!discipline) return res.status(404).json({ success: false, message: "Discipline record not found" });
    return res.status(200).json({ success: true, message: "Discipline record updated successfully", discipline });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update discipline record", error: error.message });
  }
};

export const deleteDiscipline = async (req, res) => {
  try {
    const discipline = await Discipline.findByIdAndDelete(req.params.id);
    if (!discipline) return res.status(404).json({ success: false, message: "Discipline record not found" });
    return res.status(200).json({ success: true, message: "Discipline record deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete discipline record", error: error.message });
  }
};

import Scholarship from "../models/scholarship.model.js";

export const createScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    await scholarship.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "academicYearId", select: "name startDate endDate" },
      { path: "approvedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Scholarship created successfully", scholarship });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create scholarship", error: error.message });
  }
};

export const getAllScholarships = async (req, res) => {
  try {
    const { schoolId, studentId, scholarshipType, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (studentId) filter.studentId = studentId;
    if (scholarshipType) filter.scholarshipType = scholarshipType;
    if (status) filter.status = status;

    const scholarships = await Scholarship.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "academicYearId", select: "name startDate endDate" })
      .populate({ path: "approvedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: scholarships.length, scholarships });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch scholarships", error: error.message });
  }
};

export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "academicYearId", select: "name startDate endDate" })
      .populate({ path: "approvedBy", select: "name email role" });
    if (!scholarship) return res.status(404).json({ success: false, message: "Scholarship not found" });
    return res.status(200).json({ success: true, scholarship });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch scholarship", error: error.message });
  }
};

export const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "academicYearId", select: "name startDate endDate" })
      .populate({ path: "approvedBy", select: "name email role" });
    if (!scholarship) return res.status(404).json({ success: false, message: "Scholarship not found" });
    return res.status(200).json({ success: true, message: "Scholarship updated successfully", scholarship });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update scholarship", error: error.message });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) return res.status(404).json({ success: false, message: "Scholarship not found" });
    return res.status(200).json({ success: true, message: "Scholarship deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete scholarship", error: error.message });
  }
};

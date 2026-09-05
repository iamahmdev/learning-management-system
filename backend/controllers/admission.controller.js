import mongoose from "mongoose";
import Admission from "../models/admission.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";

export const createAdmission = async (req, res) => {
  try {
    const { schoolId, academicYearId, applicationNumber, studentName, dateOfBirth, gender, classAppliedFor, fatherName, motherName, guardianPhone, guardianEmail, address, previousSchool, applicationDate, status, remarks, documents } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) return res.status(404).json({ success: false, message: "Academic year not found" });

    const classData = await Class.findById(classAppliedFor);
    if (!classData) return res.status(404).json({ success: false, message: "Class not found" });

    const admission = await Admission.create({ schoolId, academicYearId, applicationNumber, studentName, dateOfBirth, gender, classAppliedFor, fatherName, motherName, guardianPhone, guardianEmail, address, previousSchool, applicationDate, status, remarks, documents });

    await admission.populate([
      { path: "schoolId", select: "name code" },
      { path: "academicYearId", select: "name startDate endDate" },
      { path: "classAppliedFor", select: "name code" },
    ]);

    return res.status(201).json({ success: true, message: "Admission application created successfully", admission });
  } catch (error) {
    console.error("Create Admission Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate application number" });
    return res.status(500).json({ success: false, message: "Failed to create admission application", error: error.message });
  }
};

export const getAllAdmissions = async (req, res) => {
  try {
    const { schoolId, status, academicYearId } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) return res.status(400).json({ success: false, message: "Invalid School ID" });
      filter.schoolId = schoolId;
    }
    if (status) filter.status = status;
    if (academicYearId) filter.academicYearId = academicYearId;

    const admissions = await Admission.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "academicYearId", select: "name startDate endDate" })
      .populate({ path: "classAppliedFor", select: "name code" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Admissions fetched successfully", count: admissions.length, admissions });
  } catch (error) {
    console.error("Get All Admissions Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch admissions", error: error.message });
  }
};

export const getAdmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Admission ID" });

    const admission = await Admission.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "academicYearId", select: "name startDate endDate" })
      .populate({ path: "classAppliedFor", select: "name code" });

    if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

    return res.status(200).json({ success: true, message: "Admission fetched successfully", admission });
  } catch (error) {
    console.error("Get Admission By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch admission", error: error.message });
  }
};

export const updateAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Admission ID" });

    const admission = await Admission.findById(id);
    if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

    const updateData = req.body;
    Object.keys(updateData).forEach((key) => {
      admission[key] = updateData[key];
    });

    await admission.save();
    await admission.populate([
      { path: "schoolId", select: "name code" },
      { path: "academicYearId", select: "name startDate endDate" },
      { path: "classAppliedFor", select: "name code" },
    ]);

    return res.status(200).json({ success: true, message: "Admission updated successfully", admission });
  } catch (error) {
    console.error("Update Admission Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update admission", error: error.message });
  }
};

export const deleteAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Admission ID" });

    const admission = await Admission.findByIdAndDelete(id);
    if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

    return res.status(200).json({ success: true, message: "Admission deleted successfully" });
  } catch (error) {
    console.error("Delete Admission Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete admission", error: error.message });
  }
};

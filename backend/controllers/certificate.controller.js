import mongoose from "mongoose";
import Certificate from "../models/certificate.model.js";
import School from "../models/school.model.js";
import Student from "../models/student.model.js";

export const createCertificate = async (req, res) => {
  try {
    const { schoolId, studentId, certificateType, certificateNumber, issueDate, purpose, content, status, issuedBy, attachmentUrl } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const certificate = await Certificate.create({ schoolId, studentId, certificateType, certificateNumber, issueDate, purpose, content, status, issuedBy, attachmentUrl });

    await certificate.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "issuedBy", select: "name email role" },
    ]);

    return res.status(201).json({ success: true, message: "Certificate created successfully", certificate });
  } catch (error) {
    console.error("Create Certificate Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate certificate number" });
    return res.status(500).json({ success: false, message: "Failed to create certificate", error: error.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const { schoolId, studentId, certificateType, status } = req.query;
    const filter = {};

    if (schoolId) filter.schoolId = schoolId;
    if (studentId) filter.studentId = studentId;
    if (certificateType) filter.certificateType = certificateType;
    if (status) filter.status = status;

    const certificates = await Certificate.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "issuedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Certificates fetched successfully", count: certificates.length, certificates });
  } catch (error) {
    console.error("Get All Certificates Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch certificates", error: error.message });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Certificate ID" });

    const certificate = await Certificate.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "issuedBy", select: "name email role" });

    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });

    return res.status(200).json({ success: true, message: "Certificate fetched successfully", certificate });
  } catch (error) {
    console.error("Get Certificate By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch certificate", error: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Certificate ID" });

    const certificate = await Certificate.findById(id);
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });

    Object.keys(req.body).forEach((key) => {
      certificate[key] = req.body[key];
    });

    await certificate.save();
    await certificate.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "issuedBy", select: "name email role" },
    ]);

    return res.status(200).json({ success: true, message: "Certificate updated successfully", certificate });
  } catch (error) {
    console.error("Update Certificate Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update certificate", error: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Certificate ID" });

    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });

    return res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Delete Certificate Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete certificate", error: error.message });
  }
};

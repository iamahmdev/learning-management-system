import mongoose from "mongoose";
import AuditLog from "../models/auditLog.model.js";

export const createAuditLog = async (req, res) => {
  try {
    const { schoolId, userId, action, module, resourceType, resourceId, details, ipAddress, userAgent } = req.body;

    const auditLog = await AuditLog.create({ schoolId, userId, action, module, resourceType, resourceId, details, ipAddress, userAgent });

    await auditLog.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
    ]);

    return res.status(201).json({ success: true, message: "Audit log created successfully", auditLog });
  } catch (error) {
    console.error("Create Audit Log Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create audit log", error: error.message });
  }
};

export const getAllAuditLogs = async (req, res) => {
  try {
    const { schoolId, userId, module, action, startDate, endDate } = req.query;
    const filter = {};

    if (schoolId) filter.schoolId = schoolId;
    if (userId) filter.userId = userId;
    if (module) filter.module = module;
    if (action) filter.action = action;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const auditLogs = await AuditLog.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .sort({ timestamp: -1 })
      .limit(1000);

    return res.status(200).json({ success: true, message: "Audit logs fetched successfully", count: auditLogs.length, auditLogs });
  } catch (error) {
    console.error("Get All Audit Logs Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch audit logs", error: error.message });
  }
};

export const getAuditLogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Audit Log ID" });

    const auditLog = await AuditLog.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" });

    if (!auditLog) return res.status(404).json({ success: false, message: "Audit log not found" });

    return res.status(200).json({ success: true, message: "Audit log fetched successfully", auditLog });
  } catch (error) {
    console.error("Get Audit Log By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch audit log", error: error.message });
  }
};

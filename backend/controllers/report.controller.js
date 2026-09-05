import mongoose from "mongoose";
import Report from "../models/report.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";

// =====================================================
// CREATE REPORT
// =====================================================
export const createReport = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      generatedBy,
      reportType,
      title,
      description,
      filters,
      dateRange,
      data,
      fileUrl,
      format,
      status,
    } = req.body;

    // Validate School
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate Academic Year
    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    // Create Report
    const report = await Report.create({
      schoolId,
      academicYearId,
      generatedBy,
      reportType,
      title,
      description,
      filters,
      dateRange,
      data,
      fileUrl,
      format,
      status,
    });

    await report.populate([
      {
        path: "schoolId",
        select: "name code email",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate",
      },
      {
        path: "generatedBy",
        select: "name email role",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Create Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create report",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL REPORTS
// =====================================================
export const getAllReports = async (req, res) => {
  try {
    const { schoolId, academicYearId, reportType, status } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    if (academicYearId) {
      if (!mongoose.Types.ObjectId.isValid(academicYearId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Academic Year ID",
        });
      }
      filter.academicYearId = academicYearId;
    }

    if (reportType) {
      filter.reportType = reportType;
    }

    if (status) {
      filter.status = status;
    }

    const reports = await Report.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate",
      })
      .populate({
        path: "generatedBy",
        select: "name email role",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get All Reports Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

// =====================================================
// GET REPORT BY ID
// =====================================================
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    const report = await Report.findById(id)
      .populate({
        path: "schoolId",
        select: "name code email",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate",
      })
      .populate({
        path: "generatedBy",
        select: "name email role",
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Increment download count
    report.downloadCount += 1;
    await report.save();

    return res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      report,
    });
  } catch (error) {
    console.error("Get Report By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE REPORT
// =====================================================
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const {
      title,
      description,
      data,
      fileUrl,
      status,
    } = req.body;

    if (title !== undefined) report.title = title;
    if (description !== undefined) report.description = description;
    if (data !== undefined) report.data = data;
    if (fileUrl !== undefined) report.fileUrl = fileUrl;
    if (status !== undefined) report.status = status;

    await report.save();

    await report.populate([
      {
        path: "schoolId",
        select: "name code email",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate",
      },
      {
        path: "generatedBy",
        select: "name email role",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report,
    });
  } catch (error) {
    console.error("Update Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update report",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE REPORT
// =====================================================
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Report ID",
      });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await Report.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Delete Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete report",
      error: error.message,
    });
  }
};

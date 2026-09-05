import mongoose from "mongoose";
import Analytics from "../models/analytics.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";

// =====================================================
// CREATE ANALYTICS
// =====================================================
export const createAnalytics = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      date,
      metrics,
      performance,
      financial,
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

    // Create Analytics
    const analytics = await Analytics.create({
      schoolId,
      academicYearId,
      date,
      metrics,
      performance,
      financial,
    });

    await analytics.populate([
      {
        path: "schoolId",
        select: "name code email",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Analytics created successfully",
      analytics,
    });
  } catch (error) {
    console.error("Create Analytics Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Analytics already exists for this date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create analytics",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ANALYTICS
// =====================================================
export const getAllAnalytics = async (req, res) => {
  try {
    const { schoolId, academicYearId, startDate, endDate } = req.query;
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

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate",
      })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      count: analytics.length,
      analytics,
    });
  } catch (error) {
    console.error("Get All Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};

// =====================================================
// GET ANALYTICS BY ID
// =====================================================
export const getAnalyticsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Analytics ID",
      });
    }

    const analytics = await Analytics.findById(id)
      .populate({
        path: "schoolId",
        select: "name code email",
      })
      .populate({
        path: "academicYearId",
        select: "name startDate endDate",
      });

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      analytics,
    });
  } catch (error) {
    console.error("Get Analytics By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ANALYTICS
// =====================================================
export const updateAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Analytics ID",
      });
    }

    const analytics = await Analytics.findById(id);
    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found",
      });
    }

    const { metrics, performance, financial } = req.body;

    if (metrics !== undefined) {
      analytics.metrics = { ...analytics.metrics, ...metrics };
    }

    if (performance !== undefined) {
      analytics.performance = { ...analytics.performance, ...performance };
    }

    if (financial !== undefined) {
      analytics.financial = { ...analytics.financial, ...financial };
    }

    analytics.calculatedAt = Date.now();
    await analytics.save();

    await analytics.populate([
      {
        path: "schoolId",
        select: "name code email",
      },
      {
        path: "academicYearId",
        select: "name startDate endDate",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Analytics updated successfully",
      analytics,
    });
  } catch (error) {
    console.error("Update Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update analytics",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ANALYTICS
// =====================================================
export const deleteAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Analytics ID",
      });
    }

    const analytics = await Analytics.findById(id);
    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found",
      });
    }

    await Analytics.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Analytics deleted successfully",
    });
  } catch (error) {
    console.error("Delete Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete analytics",
      error: error.message,
    });
  }
};

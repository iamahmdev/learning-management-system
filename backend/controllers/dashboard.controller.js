import mongoose from "mongoose";
import Dashboard from "../models/dashboard.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

// =====================================================
// CREATE DASHBOARD
// =====================================================
export const createDashboard = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      userRole,
      widgets,
      quickLinks,
      preferences,
    } = req.body;

    // Validate User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate School
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check if dashboard already exists
    const existingDashboard = await Dashboard.findOne({ userId, schoolId });
    if (existingDashboard) {
      return res.status(409).json({
        success: false,
        message: "Dashboard already exists",
      });
    }

    // Create Dashboard
    const dashboard = await Dashboard.create({
      userId,
      schoolId,
      userRole,
      widgets,
      quickLinks,
      preferences,
    });

    await dashboard.populate([
      {
        path: "userId",
        select: "name email role",
      },
      {
        path: "schoolId",
        select: "name code",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Dashboard created successfully",
      dashboard,
    });
  } catch (error) {
    console.error("Create Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create dashboard",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL DASHBOARDS
// =====================================================
export const getAllDashboards = async (req, res) => {
  try {
    const { userId, schoolId, userRole } = req.query;
    const filter = {};

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid User ID",
        });
      }
      filter.userId = userId;
    }

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    if (userRole) {
      filter.userRole = userRole;
    }

    const dashboards = await Dashboard.find(filter)
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "schoolId",
        select: "name code",
      })
      .sort({ lastAccessed: -1 });

    return res.status(200).json({
      success: true,
      message: "Dashboards fetched successfully",
      count: dashboards.length,
      dashboards,
    });
  } catch (error) {
    console.error("Get All Dashboards Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboards",
      error: error.message,
    });
  }
};

// =====================================================
// GET DASHBOARD BY ID
// =====================================================
export const getDashboardById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Dashboard ID",
      });
    }

    const dashboard = await Dashboard.findById(id)
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "schoolId",
        select: "name code",
      });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    // Update last accessed
    dashboard.lastAccessed = Date.now();
    await dashboard.save();

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      dashboard,
    });
  } catch (error) {
    console.error("Get Dashboard By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE DASHBOARD
// =====================================================
export const updateDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Dashboard ID",
      });
    }

    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    const {
      widgets,
      quickLinks,
      recentActivities,
      preferences,
    } = req.body;

    if (widgets !== undefined) dashboard.widgets = widgets;
    if (quickLinks !== undefined) dashboard.quickLinks = quickLinks;
    if (recentActivities !== undefined) {
      dashboard.recentActivities.push(...recentActivities);
    }
    if (preferences !== undefined) {
      dashboard.preferences = { ...dashboard.preferences, ...preferences };
    }

    dashboard.lastAccessed = Date.now();
    await dashboard.save();

    await dashboard.populate([
      {
        path: "userId",
        select: "name email role",
      },
      {
        path: "schoolId",
        select: "name code",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard updated successfully",
      dashboard,
    });
  } catch (error) {
    console.error("Update Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update dashboard",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE DASHBOARD
// =====================================================
export const deleteDashboard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Dashboard ID",
      });
    }

    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found",
      });
    }

    await Dashboard.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Dashboard deleted successfully",
    });
  } catch (error) {
    console.error("Delete Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete dashboard",
      error: error.message,
    });
  }
};

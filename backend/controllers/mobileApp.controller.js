import mongoose from "mongoose";
import MobileApp from "../models/mobileApp.model.js";
import User from "../models/user.model.js";
import School from "../models/school.model.js";

// =====================================================
// REGISTER MOBILE DEVICE
// =====================================================
export const registerDevice = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      deviceInfo,
      fcmToken,
      settings,
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

    // Check if device already registered
    const existingDevice = await MobileApp.findOne({
      userId,
      "deviceInfo.deviceId": deviceInfo.deviceId,
    });

    if (existingDevice) {
      // Update existing device
      existingDevice.fcmToken = fcmToken || existingDevice.fcmToken;
      existingDevice.deviceInfo = { ...existingDevice.deviceInfo, ...deviceInfo };
      existingDevice.settings = { ...existingDevice.settings, ...settings };
      existingDevice.lastActive = Date.now();
      await existingDevice.save();

      await existingDevice.populate([
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
        message: "Device updated successfully",
        mobileApp: existingDevice,
      });
    }

    // Create new device registration
    const mobileApp = await MobileApp.create({
      userId,
      schoolId,
      deviceInfo,
      fcmToken,
      settings,
    });

    await mobileApp.populate([
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
      message: "Device registered successfully",
      mobileApp,
    });
  } catch (error) {
    console.error("Register Device Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register device",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL DEVICES
// =====================================================
export const getAllDevices = async (req, res) => {
  try {
    const { userId, schoolId, status, deviceType } = req.query;
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

    if (status) {
      filter.status = status;
    }

    if (deviceType) {
      filter["deviceInfo.deviceType"] = deviceType;
    }

    const devices = await MobileApp.find(filter)
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "schoolId",
        select: "name code",
      })
      .sort({ lastActive: -1 });

    return res.status(200).json({
      success: true,
      message: "Devices fetched successfully",
      count: devices.length,
      devices,
    });
  } catch (error) {
    console.error("Get All Devices Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch devices",
      error: error.message,
    });
  }
};

// =====================================================
// GET DEVICE BY ID
// =====================================================
export const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Device ID",
      });
    }

    const device = await MobileApp.findById(id)
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "schoolId",
        select: "name code",
      });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Device fetched successfully",
      device,
    });
  } catch (error) {
    console.error("Get Device By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch device",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE DEVICE
// =====================================================
export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Device ID",
      });
    }

    const device = await MobileApp.findById(id);
    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    const { fcmToken, settings, status, lastActive } = req.body;

    if (fcmToken !== undefined) device.fcmToken = fcmToken;
    if (settings !== undefined) {
      device.settings = { ...device.settings, ...settings };
    }
    if (status !== undefined) device.status = status;
    if (lastActive !== undefined) device.lastActive = lastActive;

    await device.save();

    await device.populate([
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
      message: "Device updated successfully",
      device,
    });
  } catch (error) {
    console.error("Update Device Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update device",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE DEVICE
// =====================================================
export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Device ID",
      });
    }

    const device = await MobileApp.findById(id);
    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    await MobileApp.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("Delete Device Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete device",
      error: error.message,
    });
  }
};

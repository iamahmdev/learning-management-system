import mongoose from "mongoose";
import Webhook from "../models/webhook.model.js";
import School from "../models/school.model.js";
import crypto from "crypto";

// =====================================================
// CREATE WEBHOOK
// =====================================================
export const createWebhook = async (req, res) => {
  try {
    const {
      schoolId,
      name,
      url,
      method,
      headers,
      events,
      retryPolicy,
      isActive,
    } = req.body;

    // Validate School
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Generate secret
    const secret = crypto.randomBytes(32).toString("hex");

    // Create Webhook
    const webhook = await Webhook.create({
      schoolId,
      name,
      url,
      method,
      headers,
      events,
      secret,
      retryPolicy,
      isActive,
    });

    await webhook.populate({
      path: "schoolId",
      select: "name code email",
    });

    return res.status(201).json({
      success: true,
      message: "Webhook created successfully",
      webhook,
    });
  } catch (error) {
    console.error("Create Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create webhook",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL WEBHOOKS
// =====================================================
export const getAllWebhooks = async (req, res) => {
  try {
    const { schoolId, status, isActive } = req.query;
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

    if (status) {
      filter.status = status;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const webhooks = await Webhook.find(filter)
      .populate({
        path: "schoolId",
        select: "name code email",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Webhooks fetched successfully",
      count: webhooks.length,
      webhooks,
    });
  } catch (error) {
    console.error("Get All Webhooks Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch webhooks",
      error: error.message,
    });
  }
};

// =====================================================
// GET WEBHOOK BY ID
// =====================================================
export const getWebhookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Webhook ID",
      });
    }

    const webhook = await Webhook.findById(id).populate({
      path: "schoolId",
      select: "name code email",
    });

    if (!webhook) {
      return res.status(404).json({
        success: false,
        message: "Webhook not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webhook fetched successfully",
      webhook,
    });
  } catch (error) {
    console.error("Get Webhook By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch webhook",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE WEBHOOK
// =====================================================
export const updateWebhook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Webhook ID",
      });
    }

    const webhook = await Webhook.findById(id);
    if (!webhook) {
      return res.status(404).json({
        success: false,
        message: "Webhook not found",
      });
    }

    const {
      name,
      url,
      method,
      headers,
      events,
      retryPolicy,
      isActive,
      status,
    } = req.body;

    if (name !== undefined) webhook.name = name;
    if (url !== undefined) webhook.url = url;
    if (method !== undefined) webhook.method = method;
    if (headers !== undefined) webhook.headers = headers;
    if (events !== undefined) webhook.events = events;
    if (retryPolicy !== undefined) webhook.retryPolicy = retryPolicy;
    if (isActive !== undefined) webhook.isActive = isActive;
    if (status !== undefined) webhook.status = status;

    await webhook.save();

    await webhook.populate({
      path: "schoolId",
      select: "name code email",
    });

    return res.status(200).json({
      success: true,
      message: "Webhook updated successfully",
      webhook,
    });
  } catch (error) {
    console.error("Update Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update webhook",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE WEBHOOK
// =====================================================
export const deleteWebhook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Webhook ID",
      });
    }

    const webhook = await Webhook.findById(id);
    if (!webhook) {
      return res.status(404).json({
        success: false,
        message: "Webhook not found",
      });
    }

    await Webhook.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Webhook deleted successfully",
    });
  } catch (error) {
    console.error("Delete Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete webhook",
      error: error.message,
    });
  }
};

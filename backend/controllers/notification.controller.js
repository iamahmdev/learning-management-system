import mongoose from "mongoose";
import Notification from "../models/notification.model.js";

export const createNotification = async (req, res) => {
  try {
    const { schoolId, userId, title, message, type, category, priority, link, metadata } = req.body;

    const notification = await Notification.create({ schoolId, userId, title, message, type, category, priority, link, metadata });

    await notification.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
    ]);

    return res.status(201).json({ success: true, message: "Notification created successfully", notification });
  } catch (error) {
    console.error("Create Notification Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create notification", error: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const { userId, isRead, category, type } = req.query;
    const filter = {};

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ success: false, message: "Invalid User ID" });
      filter.userId = userId;
    }
    if (isRead !== undefined) filter.isRead = isRead === "true";
    if (category) filter.category = category;
    if (type) filter.type = type;

    const notifications = await Notification.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Notifications fetched successfully", count: notifications.length, notifications });
  } catch (error) {
    console.error("Get All Notifications Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch notifications", error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Notification ID" });

    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    return res.status(200).json({ success: true, message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Mark As Read Error:", error);
    return res.status(500).json({ success: false, message: "Failed to mark notification as read", error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Notification ID" });

    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

    return res.status(200).json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete notification", error: error.message });
  }
};

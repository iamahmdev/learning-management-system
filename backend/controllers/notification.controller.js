import mongoose from "mongoose";
import Notification from "../models/notification.model.js";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// CREATE NOTIFICATION
// =====================================================

export const createNotification = async (req, res) => {
  try {
    const {
      schoolId,
      senderId,
      receiverId,
      title,
      message,
      type,
      priority,
      actionUrl,
      metadata,
      expiresAt,
      isActive,
      deliveryMethod,
    } = req.body;

    // Create notification
    const notification = new Notification({
      schoolId,
      senderId,
      receiverId,
      title,
      message,
      type,
      priority,
      actionUrl,
      metadata,
      expiresAt,
      isActive,
      deliveryMethod,
    });

    await notification.save();

    // Populate references
    await notification.populate([
      { path: "schoolId", select: "name" },
      { path: "senderId", select: "name email role" },
      { path: "receiverId", select: "name email role" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================

export const getAllNotifications = async (req, res) => {
  try {
    const {
      schoolId,
      receiverId,
      senderId,
      type,
      priority,
      isRead,
      isActive,
      page = 1,
      limit = 50,
    } = req.query;

    // Build filter
    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (receiverId && isValidObjectId(receiverId)) {
      filter.receiverId = receiverId;
    }

    if (senderId && isValidObjectId(senderId)) {
      filter.senderId = senderId;
    }

    if (type) {
      filter.type = type;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (isRead !== undefined) {
      filter.isRead = isRead === 'true';
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get notifications
    const notifications = await Notification.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "senderId", select: "name email role" },
        { path: "receiverId", select: "name email role" },
      ])
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalCount = await Notification.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      count: notifications.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: notifications,
    });
  } catch (error) {
    console.error("Get All Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notifications",
    });
  }
};

// =====================================================
// GET NOTIFICATION BY ID
// =====================================================

export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID format",
      });
    }

    // Find notification
    const notification = await Notification.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "senderId", select: "name email role" },
        { path: "receiverId", select: "name email role" },
      ]);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification retrieved successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Get Notification By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notification",
    });
  }
};

// =====================================================
// MARK NOTIFICATION AS READ
// =====================================================

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID format",
      });
    }

    // Update notification
    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
        readAt: new Date(),
      },
      {
        new: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "senderId", select: "name email role" },
      { path: "receiverId", select: "name email role" },
    ]);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    console.error("Mark As Read Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
};

// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================

export const markAllAsRead = async (req, res) => {
  try {
    const { receiverId } = req.body;

    // Validate receiverId
    if (!receiverId || !isValidObjectId(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "Valid receiver ID is required",
      });
    }

    // Update all unread notifications for the receiver
    const result = await Notification.updateMany(
      {
        receiverId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`,
      data: {
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error("Mark All As Read Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
    });
  }
};

// =====================================================
// GET UNREAD NOTIFICATIONS COUNT
// =====================================================

export const getUnreadCount = async (req, res) => {
  try {
    const { receiverId } = req.query;

    // Validate receiverId
    if (!receiverId || !isValidObjectId(receiverId)) {
      return res.status(400).json({
        success: false,
        message: "Valid receiver ID is required",
      });
    }

    // Count unread notifications
    const unreadCount = await Notification.countDocuments({
      receiverId,
      isRead: false,
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      message: "Unread notifications count retrieved successfully",
      data: {
        unreadCount,
      },
    });
  } catch (error) {
    console.error("Get Unread Count Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve unread notifications count",
    });
  }
};

// =====================================================
// UPDATE NOTIFICATION
// =====================================================

export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID format",
      });
    }

    // Remove fields that shouldn't be updated
    delete updateData.senderId;
    delete updateData.receiverId;
    delete updateData.sentAt;

    // Find and update notification
    const notification = await Notification.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "senderId", select: "name email role" },
      { path: "receiverId", select: "name email role" },
    ]);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Update Notification Error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// =====================================================
// DELETE NOTIFICATION
// =====================================================

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification ID format",
      });
    }

    // Find and delete notification
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};

// =====================================================
// BULK CREATE NOTIFICATIONS
// =====================================================

export const bulkCreateNotifications = async (req, res) => {
  try {
    const {
      schoolId,
      senderId,
      receiverIds,
      title,
      message,
      type,
      priority,
      actionUrl,
      metadata,
      expiresAt,
      isActive,
      deliveryMethod,
    } = req.body;

    // Validate receiverIds
    if (!receiverIds || !Array.isArray(receiverIds) || receiverIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid receiver IDs array is required",
      });
    }

    // Validate all receiver IDs
    const invalidIds = receiverIds.filter(id => !isValidObjectId(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some receiver IDs have invalid format",
      });
    }

    // Create notifications for all receivers
    const notificationPromises = receiverIds.map(receiverId => {
      return new Notification({
        schoolId,
        senderId,
        receiverId,
        title,
        message,
        type,
        priority,
        actionUrl,
        metadata,
        expiresAt,
        isActive,
        deliveryMethod,
      }).save();
    });

    const notifications = await Promise.all(notificationPromises);

    return res.status(201).json({
      success: true,
      message: `${notifications.length} notifications created successfully`,
      data: {
        count: notifications.length,
        receiverIds,
      },
    });
  } catch (error) {
    console.error("Bulk Create Notifications Error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create bulk notifications",
    });
  }
};
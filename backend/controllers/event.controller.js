import mongoose from "mongoose";
import Event from "../models/event.model.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    const event = new Event(eventData);
    await event.save();

    await event.populate([
      { path: "schoolId", select: "name" },
      { path: "organizer", select: "name" },
      { path: "createdBy", select: "name" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const {
      schoolId,
      eventType,
      status,
      upcoming,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (schoolId && isValidObjectId(schoolId)) {
      filter.schoolId = schoolId;
    }

    if (eventType) {
      filter.eventType = eventType;
    }

    if (status) {
      filter.status = status;
    }

    if (upcoming === 'true') {
      filter.eventDate = { $gte: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const events = await Event.find(filter)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "organizer", select: "name" },
        { path: "createdBy", select: "name" },
      ])
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Event.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      count: events.length,
      totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      data: events,
    });
  } catch (error) {
    console.error("Get All Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve events",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id)
      .populate([
        { path: "schoolId", select: "name" },
        { path: "organizer", select: "name" },
        { path: "createdBy", select: "name" },
      ]);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    console.error("Get Event By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve event",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "schoolId", select: "name" },
      { path: "organizer", select: "name" },
      { path: "createdBy", select: "name" },
    ]);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};
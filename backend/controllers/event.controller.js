import mongoose from "mongoose";
import Event from "../models/event.model.js";
import School from "../models/school.model.js";

export const createEvent = async (req, res) => {
  try {
    const { schoolId, title, description, eventType, startDate, endDate, startTime, endTime, venue, organizer, targetAudience, classIds, attachments, isHoliday, status, createdBy } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const event = await Event.create({ schoolId, title, description, eventType, startDate, endDate, startTime, endTime, venue, organizer, targetAudience, classIds, attachments, isHoliday, status, createdBy });

    await event.populate([
      { path: "schoolId", select: "name code" },
      { path: "createdBy", select: "name email role" },
    ]);

    return res.status(201).json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create event", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { schoolId, eventType, status, isHoliday } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) return res.status(400).json({ success: false, message: "Invalid School ID" });
      filter.schoolId = schoolId;
    }
    if (eventType) filter.eventType = eventType;
    if (status) filter.status = status;
    if (isHoliday !== undefined) filter.isHoliday = isHoliday === "true";

    const events = await Event.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" })
      .sort({ startDate: 1 });

    return res.status(200).json({ success: true, message: "Events fetched successfully", count: events.length, events });
  } catch (error) {
    console.error("Get All Events Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch events", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Event ID" });

    const event = await Event.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" });

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    return res.status(200).json({ success: true, message: "Event fetched successfully", event });
  } catch (error) {
    console.error("Get Event By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch event", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Event ID" });

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const updateData = req.body;
    Object.keys(updateData).forEach((key) => {
      event[key] = updateData[key];
    });

    await event.save();
    await event.populate([
      { path: "schoolId", select: "name code" },
      { path: "createdBy", select: "name email role" },
    ]);

    return res.status(200).json({ success: true, message: "Event updated successfully", event });
  } catch (error) {
    console.error("Update Event Error:", error);
    return res.status(500).json({ success: false, message: "Failed to update event", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Event ID" });

    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    return res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete event", error: error.message });
  }
};

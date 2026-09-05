import Hostel from "../models/hostel.model.js";

export const createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    await hostel.populate([
      { path: "schoolId", select: "name code" },
      { path: "warden", select: "employeeId designation" },
    ]);
    return res.status(201).json({ success: true, message: "Hostel created successfully", hostel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create hostel", error: error.message });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const { schoolId, hostelType, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (hostelType) filter.hostelType = hostelType;
    if (status) filter.status = status;

    const hostels = await Hostel.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "warden", select: "employeeId designation" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: hostels.length, hostels });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch hostels", error: error.message });
  }
};

export const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "warden", select: "employeeId designation" });
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });
    return res.status(200).json({ success: true, hostel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch hostel", error: error.message });
  }
};

export const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "warden", select: "employeeId designation" });
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });
    return res.status(200).json({ success: true, message: "Hostel updated successfully", hostel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update hostel", error: error.message });
  }
};

export const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });
    return res.status(200).json({ success: true, message: "Hostel deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete hostel", error: error.message });
  }
};

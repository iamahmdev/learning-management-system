import BiometricAttendance from "../models/biometricAttendance.model.js";

export const createBiometricAttendance = async (req, res) => {
  try {
    const attendance = await BiometricAttendance.create(req.body);
    await attendance.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Biometric attendance created successfully", attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create biometric attendance", error: error.message });
  }
};

export const getAllBiometricAttendance = async (req, res) => {
  try {
    const { schoolId, userId, userType, date, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (userId) filter.userId = userId;
    if (userType) filter.userType = userType;
    if (date) filter.date = { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) };
    if (status) filter.status = status;

    const attendance = await BiometricAttendance.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .sort({ date: -1, checkInTime: -1 });

    return res.status(200).json({ success: true, count: attendance.length, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch biometric attendance", error: error.message });
  }
};

export const getBiometricAttendanceById = async (req, res) => {
  try {
    const attendance = await BiometricAttendance.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" });
    if (!attendance) return res.status(404).json({ success: false, message: "Biometric attendance not found" });
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch biometric attendance", error: error.message });
  }
};

export const updateBiometricAttendance = async (req, res) => {
  try {
    const attendance = await BiometricAttendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" });
    if (!attendance) return res.status(404).json({ success: false, message: "Biometric attendance not found" });
    return res.status(200).json({ success: true, message: "Biometric attendance updated successfully", attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update biometric attendance", error: error.message });
  }
};

export const deleteBiometricAttendance = async (req, res) => {
  try {
    const attendance = await BiometricAttendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ success: false, message: "Biometric attendance not found" });
    return res.status(200).json({ success: true, message: "Biometric attendance deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete biometric attendance", error: error.message });
  }
};

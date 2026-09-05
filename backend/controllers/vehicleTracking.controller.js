import VehicleTracking from "../models/vehicleTracking.model.js";

export const createVehicleTracking = async (req, res) => {
  try {
    const tracking = await VehicleTracking.create(req.body);
    await tracking.populate([
      { path: "schoolId", select: "name code" },
      { path: "vehicleId", select: "vehicleNumber vehicleType" },
      { path: "driverId", select: "employeeId" },
    ]);
    return res.status(201).json({ success: true, message: "Vehicle tracking created successfully", tracking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create vehicle tracking", error: error.message });
  }
};

export const getAllVehicleTracking = async (req, res) => {
  try {
    const { schoolId, vehicleId, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (vehicleId) filter.vehicleId = vehicleId;
    if (status) filter.status = status;

    const tracking = await VehicleTracking.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "vehicleId", select: "vehicleNumber vehicleType" })
      .populate({ path: "driverId", select: "employeeId" })
      .sort({ timestamp: -1 })
      .limit(1000);

    return res.status(200).json({ success: true, count: tracking.length, tracking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch vehicle tracking", error: error.message });
  }
};

export const getVehicleTrackingById = async (req, res) => {
  try {
    const tracking = await VehicleTracking.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "vehicleId", select: "vehicleNumber vehicleType" })
      .populate({ path: "driverId", select: "employeeId" });
    if (!tracking) return res.status(404).json({ success: false, message: "Vehicle tracking not found" });
    return res.status(200).json({ success: true, tracking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch vehicle tracking", error: error.message });
  }
};

export const deleteVehicleTracking = async (req, res) => {
  try {
    const tracking = await VehicleTracking.findByIdAndDelete(req.params.id);
    if (!tracking) return res.status(404).json({ success: false, message: "Vehicle tracking not found" });
    return res.status(200).json({ success: true, message: "Vehicle tracking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete vehicle tracking", error: error.message });
  }
};

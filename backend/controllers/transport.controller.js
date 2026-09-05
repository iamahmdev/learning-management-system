import Transport from "../models/transport.model.js";

import {
  createTransportValidation,
  updateTransportValidation,
} from "../validations/transport.validation.js";

// Create Transport
export const createTransport = async (req, res) => {
  try {
    const { error, value } = createTransportValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    if (value.dropoffTime <= value.pickupTime) {
      return res.status(400).json({
        success: false,
        message: "Drop-off time must be after pickup time",
      });
    }

    const transport = await Transport.create({
      ...value,
      createdBy: req.user?._id || req.user?.id || value.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Transport created successfully",
      data: transport,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Vehicle number already exists for this school",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create transport",
      error: error.message,
    });
  }
};

// Get All Transports
export const getAllTransports = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) filter.schoolId = req.query.schoolId;
    if (req.query.academicYearId) {
      filter.academicYearId = req.query.academicYearId;
    }
    if (req.query.vehicleType) filter.vehicleType = req.query.vehicleType;
    if (req.query.routeName) filter.routeName = req.query.routeName;
    if (req.query.status) filter.status = req.query.status;

    const transports = await Transport.find(filter)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transports.length,
      data: transports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transports",
      error: error.message,
    });
  }
};

// Get Transport By ID
export const getTransportById = async (req, res) => {
  try {
    const { id } = req.params;

    const transport = await Transport.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!transport) {
      return res.status(404).json({
        success: false,
        message: "Transport not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: transport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transport",
      error: error.message,
    });
  }
};

// Update Transport
export const updateTransport = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateTransportValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const existingTransport = await Transport.findById(id);

    if (!existingTransport) {
      return res.status(404).json({
        success: false,
        message: "Transport not found",
      });
    }

    const pickupTime =
      value.pickupTime !== undefined
        ? value.pickupTime
        : existingTransport.pickupTime;

    const dropoffTime =
      value.dropoffTime !== undefined
        ? value.dropoffTime
        : existingTransport.dropoffTime;

    if (dropoffTime <= pickupTime) {
      return res.status(400).json({
        success: false,
        message: "Drop-off time must be after pickup time",
      });
    }

    const transport = await Transport.findByIdAndUpdate(
      id,
      {
        ...value,
        pickupTime,
        dropoffTime,
        updatedBy: req.user?._id || req.user?.id || value.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Transport updated successfully",
      data: transport,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Vehicle number already exists for this school",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update transport",
      error: error.message,
    });
  }
};

// Delete Transport
export const deleteTransport = async (req, res) => {
  try {
    const { id } = req.params;

    const transport = await Transport.findByIdAndDelete(id);

    if (!transport) {
      return res.status(404).json({
        success: false,
        message: "Transport not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transport deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete transport",
      error: error.message,
    });
  }
};
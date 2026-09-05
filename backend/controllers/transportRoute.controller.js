import TransportRoute from "../models/transportRoute.model.js";

// =====================================================
// CREATE TRANSPORT ROUTE
// =====================================================
export const createTransportRoute = async (req, res) => {
  try {
    const route = await TransportRoute.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Transport route created successfully",
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL TRANSPORT ROUTES
// =====================================================
export const getAllTransportRoutes = async (req, res) => {
  try {
    const {
      schoolId,
      routeCode,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (routeCode) query.routeCode = new RegExp(routeCode, "i");
    if (status) query.status = status;

    const routes = await TransportRoute.find(query)
      .populate("schoolId", "name code")
      .populate("vehicleId", "vehicleNumber vehicleType")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await TransportRoute.countDocuments(query);

    res.status(200).json({
      success: true,
      data: routes,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET TRANSPORT ROUTE BY ID
// =====================================================
export const getTransportRouteById = async (req, res) => {
  try {
    const route = await TransportRoute.findById(req.params.id)
      .populate("schoolId", "name code")
      .populate("vehicleId", "vehicleNumber vehicleType")
      .populate("createdBy", "name email");

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Transport route not found",
      });
    }

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE TRANSPORT ROUTE
// =====================================================
export const updateTransportRoute = async (req, res) => {
  try {
    const route = await TransportRoute.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Transport route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transport route updated successfully",
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE TRANSPORT ROUTE
// =====================================================
export const deleteTransportRoute = async (req, res) => {
  try {
    const route = await TransportRoute.findByIdAndDelete(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Transport route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transport route deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

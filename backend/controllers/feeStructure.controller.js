import FeeStructure from "../models/feeStructure.model.js";

// =====================================================
// CREATE FEE STRUCTURE
// =====================================================
export const createFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Fee structure created successfully",
      data: feeStructure,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL FEE STRUCTURES
// =====================================================
export const getAllFeeStructures = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      feeType,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (academicYearId) query.academicYearId = academicYearId;
    if (classId) query.classId = classId;
    if (feeType) query.feeType = feeType;
    if (status) query.status = status;

    const feeStructures = await FeeStructure.find(query)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("classId", "name code")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await FeeStructure.countDocuments(query);

    res.status(200).json({
      success: true,
      data: feeStructures,
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
// GET FEE STRUCTURE BY ID
// =====================================================
export const getFeeStructureById = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findById(req.params.id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("classId", "name code")
      .populate("createdBy", "name email");

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found",
      });
    }

    res.status(200).json({
      success: true,
      data: feeStructure,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE FEE STRUCTURE
// =====================================================
export const updateFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findByIdAndUpdate(
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

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee structure updated successfully",
      data: feeStructure,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE FEE STRUCTURE
// =====================================================
export const deleteFeeStructure = async (req, res) => {
  try {
    const feeStructure = await FeeStructure.findByIdAndDelete(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee structure deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

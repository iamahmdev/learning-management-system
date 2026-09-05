import Fee from "../models/fee.model.js";

import {
  createFeeValidation,
  updateFeeValidation,
} from "../validations/fee.validation.js";

// Create Fee
export const createFee = async (req, res) => {
  try {
    const { error, value } = createFeeValidation.validate(req.body, {
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

    const fee = await Fee.create({
      ...value,
      createdBy: req.user?._id || req.user?.id || value.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Fee created successfully",
      data: fee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A fee record already exists for this student, academic year, fee type and due date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create fee",
      error: error.message,
    });
  }
};

// Get All Fees
export const getAllFees = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) filter.schoolId = req.query.schoolId;
    if (req.query.academicYearId)
      filter.academicYearId = req.query.academicYearId;
    if (req.query.studentId) filter.studentId = req.query.studentId;
    if (req.query.feeType) filter.feeType = req.query.feeType;
    if (req.query.status) filter.status = req.query.status;

    const fees = await Fee.find(filter)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("studentId")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ dueDate: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: fees.length,
      data: fees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fees",
      error: error.message,
    });
  }
};

// Get Fee By ID
export const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("studentId")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fee",
      error: error.message,
    });
  }
};

// Update Fee
export const updateFee = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateFeeValidation.validate(req.body, {
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

    const existingFee = await Fee.findById(id);

    if (!existingFee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    const amount = value.amount ?? existingFee.amount;
    const paidAmount = value.paidAmount ?? existingFee.paidAmount;
    const dueDate = value.dueDate ?? existingFee.dueDate;

    if (paidAmount > amount) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot be greater than fee amount",
      });
    }

    let status;

    if (paidAmount === amount) {
      status = "paid";
    } else if (paidAmount > 0) {
      status = "partial";
    } else if (new Date(dueDate) < new Date()) {
      status = "overdue";
    } else {
      status = "pending";
    }

    const fee = await Fee.findByIdAndUpdate(
      id,
      {
        ...value,
        amount,
        paidAmount,
        status,
        updatedBy: req.user?._id || req.user?.id || value.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("studentId")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Fee updated successfully",
      data: fee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A fee record already exists for this student, academic year, fee type and due date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update fee",
      error: error.message,
    });
  }
};

// Delete Fee
export const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findByIdAndDelete(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete fee",
      error: error.message,
    });
  }
};
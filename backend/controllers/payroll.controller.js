import Payroll from "../models/payroll.model.js";

import {
  createPayrollValidation,
  updatePayrollValidation,
} from "../validations/payroll.validation.js";

// Create Payroll
export const createPayroll = async (req, res) => {
  try {
    const { error, value } = createPayrollValidation.validate(req.body, {
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

    const basicSalary = value.basicSalary;
    const allowances = value.allowances || 0;
    const deductions = value.deductions || 0;

    const netSalary = basicSalary + allowances - deductions;

    if (netSalary < 0) {
      return res.status(400).json({
        success: false,
        message: "Deductions cannot be greater than total salary",
      });
    }

    const payroll = await Payroll.create({
      ...value,
      netSalary,
      createdBy: req.user?._id || req.user?.id || value.createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Payroll created successfully",
      data: payroll,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Payroll already exists for this employee and salary month",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create payroll",
      error: error.message,
    });
  }
};

// Get All Payrolls
export const getAllPayrolls = async (req, res) => {
  try {
    const filter = {};

    if (req.query.schoolId) filter.schoolId = req.query.schoolId;

    if (req.query.academicYearId) {
      filter.academicYearId = req.query.academicYearId;
    }

    if (req.query.employeeId) {
      filter.employeeId = req.query.employeeId;
    }

    if (req.query.salaryMonth) {
      filter.salaryMonth = req.query.salaryMonth;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const payrolls = await Payroll.find(filter)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("employeeId", "name email role phone")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ salaryMonth: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payrolls",
      error: error.message,
    });
  }
};

// Get Payroll By ID
export const getPayrollById = async (req, res) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("employeeId", "name email role phone")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payroll",
      error: error.message,
    });
  }
};

// Update Payroll
export const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updatePayrollValidation.validate(req.body, {
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

    const existingPayroll = await Payroll.findById(id);

    if (!existingPayroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    const basicSalary =
      value.basicSalary !== undefined
        ? value.basicSalary
        : existingPayroll.basicSalary;

    const allowances =
      value.allowances !== undefined
        ? value.allowances
        : existingPayroll.allowances;

    const deductions =
      value.deductions !== undefined
        ? value.deductions
        : existingPayroll.deductions;

    const netSalary = basicSalary + allowances - deductions;

    if (netSalary < 0) {
      return res.status(400).json({
        success: false,
        message: "Deductions cannot be greater than total salary",
      });
    }

    const payroll = await Payroll.findByIdAndUpdate(
      id,
      {
        ...value,
        netSalary,
        updatedBy: req.user?._id || req.user?.id || value.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("employeeId", "name email role phone")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Payroll updated successfully",
      data: payroll,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Payroll already exists for this employee and salary month",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update payroll",
      error: error.message,
    });
  }
};

// Delete Payroll
export const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findByIdAndDelete(id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payroll deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete payroll",
      error: error.message,
    });
  }
};
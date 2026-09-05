import FeePayment from "../models/feePayment.model.js";

export const createFeePayment = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      feeId,
      studentId,
      amount,
      paymentDate,
      paymentMethod,
      transactionId,
      receiptNumber,
      collectedBy,
      remarks,
      status,
    } = req.body;

    const payment = await FeePayment.create({
      schoolId,
      academicYearId,
      feeId,
      studentId,
      amount: Number(amount),
      paymentDate,
      paymentMethod,
      transactionId,
      receiptNumber: receiptNumber?.trim(),
      collectedBy,
      remarks,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Fee payment recorded successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to record fee payment",
      error: error.message,
    });
  }
};

export const getAllFeePayments = async (req, res) => {
  try {
    const { schoolId, studentId, feeId, status } = req.query;
    const filters = {};

    if (schoolId) filters.schoolId = schoolId;
    if (studentId) filters.studentId = studentId;
    if (feeId) filters.feeId = feeId;
    if (status) filters.status = status;

    const payments = await FeePayment.find(filters)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("feeId", "title totalAmount")
      .populate("studentId", "name email")
      .populate("collectedBy", "name email")
      .sort({ paymentDate: -1 });

    return res.status(200).json({
      success: true,
      message: "Fee payments fetched successfully",
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fee payments",
      error: error.message,
    });
  }
};

export const getFeePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await FeePayment.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("feeId", "title totalAmount")
      .populate("studentId", "name email")
      .populate("collectedBy", "name email");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Fee payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fee payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch fee payment",
      error: error.message,
    });
  }
};

export const updateFeePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await FeePayment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Fee payment not found",
      });
    }

    const updateFields = [
      "schoolId",
      "academicYearId",
      "feeId",
      "studentId",
      "amount",
      "paymentDate",
      "paymentMethod",
      "transactionId",
      "receiptNumber",
      "collectedBy",
      "remarks",
      "status",
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        payment[field] = req.body[field];
      }
    });

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Fee payment updated successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update fee payment",
      error: error.message,
    });
  }
};

export const deleteFeePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await FeePayment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Fee payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fee payment deleted successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete fee payment",
      error: error.message,
    });
  }
};

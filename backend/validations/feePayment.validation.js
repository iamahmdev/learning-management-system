import mongoose from "mongoose";

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const allowedStatuses = ["completed", "refunded", "cancelled"];

export const validateCreateFeePayment = (req, res, next) => {
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

    if (!schoolId || !isValidObjectId(schoolId)) {
      return res.status(400).json({
        success: false,
        message: "Valid schoolId is required",
      });
    }

    if (!academicYearId || !isValidObjectId(academicYearId)) {
      return res.status(400).json({
        success: false,
        message: "Valid academicYearId is required",
      });
    }

    if (!feeId || !isValidObjectId(feeId)) {
      return res.status(400).json({
        success: false,
        message: "Valid feeId is required",
      });
    }

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required",
      });
    }

    if (amount === undefined || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Payment amount is required and must be greater than zero",
      });
    }

    if (!paymentDate || Number.isNaN(new Date(paymentDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Valid paymentDate is required",
      });
    }

    if (
      !paymentMethod ||
      !["cash", "bank_transfer", "card", "online", "cheque", "other"].includes(paymentMethod)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid paymentMethod is required",
      });
    }

    if (!receiptNumber || !receiptNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: "Receipt number is required",
      });
    }

    if (!collectedBy || !isValidObjectId(collectedBy)) {
      return res.status(400).json({
        success: false,
        message: "Valid collectedBy user ID is required",
      });
    }

    if (transactionId !== undefined && typeof transactionId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Transaction ID must be a string",
      });
    }

    if (remarks !== undefined && typeof remarks !== "string") {
      return res.status(400).json({
        success: false,
        message: "Remarks must be a string",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee payment data",
      error: error.message,
    });
  }
};

export const validateUpdateFeePayment = (req, res, next) => {
  try {
    const { schoolId, academicYearId, feeId, studentId, amount, paymentDate, paymentMethod, transactionId, receiptNumber, collectedBy, remarks, status } = req.body;

    if (schoolId !== undefined && (!schoolId || !isValidObjectId(schoolId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid schoolId",
      });
    }

    if (academicYearId !== undefined && (!academicYearId || !isValidObjectId(academicYearId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid academicYearId",
      });
    }

    if (feeId !== undefined && (!feeId || !isValidObjectId(feeId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid feeId",
      });
    }

    if (studentId !== undefined && (!studentId || !isValidObjectId(studentId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentId",
      });
    }

    if (amount !== undefined && (Number(amount) <= 0 || Number.isNaN(Number(amount)))) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid positive number",
      });
    }

    if (paymentDate !== undefined && Number.isNaN(new Date(paymentDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid paymentDate",
      });
    }

    if (paymentMethod !== undefined && !["cash", "bank_transfer", "card", "online", "cheque", "other"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    if (receiptNumber !== undefined && (!receiptNumber || !receiptNumber.trim())) {
      return res.status(400).json({
        success: false,
        message: "Receipt number cannot be empty",
      });
    }

    if (collectedBy !== undefined && (!collectedBy || !isValidObjectId(collectedBy))) {
      return res.status(400).json({
        success: false,
        message: "Invalid collectedBy ID",
      });
    }

    if (transactionId !== undefined && typeof transactionId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Transaction ID must be a string",
      });
    }

    if (remarks !== undefined && typeof remarks !== "string") {
      return res.status(400).json({
        success: false,
        message: "Remarks must be a string",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee payment update data",
      error: error.message,
    });
  }
};

export const validateFeePaymentId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee payment ID",
    });
  }

  next();
};

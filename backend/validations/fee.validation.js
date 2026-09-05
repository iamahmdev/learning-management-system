import mongoose from "mongoose";

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const allowedFeeTypes = [
  "tuition",
  "admission",
  "exam",
  "transport",
  "library",
  "laboratory",
  "sports",
  "uniform",
  "books",
  "other",
];

const allowedStatuses = [
  "pending",
  "partial",
  "paid",
  "overdue",
  "cancelled",
];

export const validateCreateFee = (req, res, next) => {
  try {
    const {
      schoolId,
      academicYearId,
      studentId,
      feeType,
      title,
      amount,
      discount,
      fine,
      dueDate,
      paymentMethod,
      transactionId,
      remarks,
      status,
      createdBy,
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

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required",
      });
    }

    if (!feeType || !allowedFeeTypes.includes(feeType)) {
      return res.status(400).json({
        success: false,
        message:
          "Valid feeType is required. Allowed values: tuition, admission, exam, transport, library, laboratory, sports, uniform, books, other",
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Fee title is required",
      });
    }

    if (amount === undefined || Number(amount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Fee amount is required and cannot be negative",
      });
    }

    if (discount !== undefined && Number(discount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Discount cannot be negative",
      });
    }

    if (fine !== undefined && Number(fine) < 0) {
      return res.status(400).json({
        success: false,
        message: "Fine cannot be negative",
      });
    }

    if (!dueDate || Number.isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Valid dueDate is required",
      });
    }

    if (
      paymentMethod !== undefined &&
      !["cash", "bank_transfer", "card", "online", "cheque", "other"].includes(paymentMethod)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    if (
      createdBy !== undefined &&
      createdBy !== null &&
      !isValidObjectId(createdBy)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid createdBy ID",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid fee status",
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

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee data",
      error: error.message,
    });
  }
};

export const validateUpdateFee = (req, res, next) => {
  try {
    const { schoolId, academicYearId, studentId, feeType, title, amount, discount, fine, dueDate, paymentMethod, transactionId, remarks, status } = req.body;

    if (schoolId !== undefined && (!isValidObjectId(schoolId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid schoolId",
      });
    }

    if (academicYearId !== undefined && (!isValidObjectId(academicYearId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid academicYearId",
      });
    }

    if (studentId !== undefined && (!isValidObjectId(studentId))) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentId",
      });
    }

    if (feeType !== undefined && !allowedFeeTypes.includes(feeType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid feeType",
      });
    }

    if (title !== undefined && (!title || !title.trim())) {
      return res.status(400).json({
        success: false,
        message: "Fee title cannot be empty",
      });
    }

    if (amount !== undefined && (Number(amount) < 0 || Number.isNaN(Number(amount)))) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a valid non-negative number",
      });
    }

    if (discount !== undefined && (Number(discount) < 0 || Number.isNaN(Number(discount)))) {
      return res.status(400).json({
        success: false,
        message: "Discount must be a valid non-negative number",
      });
    }

    if (fine !== undefined && (Number(fine) < 0 || Number.isNaN(Number(fine)))) {
      return res.status(400).json({
        success: false,
        message: "Fine must be a valid non-negative number",
      });
    }

    if (dueDate !== undefined && Number.isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid dueDate",
      });
    }

    if (paymentMethod !== undefined && !["cash", "bank_transfer", "card", "online", "cheque", "other"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
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
        message: "Invalid fee status",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee update data",
      error: error.message,
    });
  }
};

export const validateFeeId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid fee ID",
    });
  }

  next();
};

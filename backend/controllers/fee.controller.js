import Fee from "../models/fee.model.js";

export const createFee = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      studentId,
      feeType,
      title,
      amount,
      discount = 0,
      fine = 0,
      dueDate,
      paymentMethod,
      transactionId,
      remarks,
      status,
    } = req.body;

    const createdBy = req.user?._id || req.body.createdBy;

    if (!schoolId || !academicYearId || !studentId || !feeType || !title || amount === undefined || !dueDate || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "schoolId, academicYearId, studentId, feeType, title, amount, dueDate, and createdBy are required",
      });
    }

    const fee = await Fee.create({
      schoolId,
      academicYearId,
      studentId,
      feeType,
      title: title.trim(),
      amount: Number(amount),
      discount: Number(discount || 0),
      fine: Number(fine || 0),
      dueDate,
      paymentMethod,
      transactionId,
      remarks,
      createdBy,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Fee created successfully",
      data: fee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create fee",
      error: error.message,
    });
  }
};

export const getAllFees = async (req, res) => {
  try {
    const { schoolId, studentId, status, feeType } = req.query;
    const filters = {};

    if (schoolId) filters.schoolId = schoolId;
    if (studentId) filters.studentId = studentId;
    if (status) filters.status = status;
    if (feeType) filters.feeType = feeType;

    const fees = await Fee.find(filters)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("studentId", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Fees fetched successfully",
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

export const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await Fee.findById(id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name startDate endDate")
      .populate("studentId", "name email")
      .populate("createdBy", "name email");

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fee fetched successfully",
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

export const updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await Fee.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    const updateFields = [
      "schoolId",
      "academicYearId",
      "studentId",
      "feeType",
      "title",
      "amount",
      "discount",
      "fine",
      "dueDate",
      "paymentMethod",
      "transactionId",
      "remarks",
      "status",
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        fee[field] = req.body[field];
      }
    });

    if (req.body.title !== undefined) {
      fee.title = req.body.title.trim();
    }

    await fee.save();

    return res.status(200).json({
      success: true,
      message: "Fee updated successfully",
      data: fee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update fee",
      error: error.message,
    });
  }
};

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
      data: fee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete fee",
      error: error.message,
    });
  }
};

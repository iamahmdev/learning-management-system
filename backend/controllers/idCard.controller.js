import IDCard from "../models/idCard.model.js";

export const createIDCard = async (req, res) => {
  try {
    const idCard = await IDCard.create(req.body);
    await idCard.populate([
      { path: "schoolId", select: "name code" },
      { path: "userId", select: "name email role" },
      { path: "issuedBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "ID Card created successfully", idCard });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate card number" });
    return res.status(500).json({ success: false, message: "Failed to create ID card", error: error.message });
  }
};

export const getAllIDCards = async (req, res) => {
  try {
    const { schoolId, userType, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (userType) filter.userType = userType;
    if (status) filter.status = status;

    const idCards = await IDCard.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .populate({ path: "issuedBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: idCards.length, idCards });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch ID cards", error: error.message });
  }
};

export const getIDCardById = async (req, res) => {
  try {
    const idCard = await IDCard.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .populate({ path: "issuedBy", select: "name email role" });
    if (!idCard) return res.status(404).json({ success: false, message: "ID Card not found" });
    return res.status(200).json({ success: true, idCard });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch ID card", error: error.message });
  }
};

export const updateIDCard = async (req, res) => {
  try {
    const idCard = await IDCard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "userId", select: "name email role" })
      .populate({ path: "issuedBy", select: "name email role" });
    if (!idCard) return res.status(404).json({ success: false, message: "ID Card not found" });
    return res.status(200).json({ success: true, message: "ID Card updated successfully", idCard });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update ID card", error: error.message });
  }
};

export const deleteIDCard = async (req, res) => {
  try {
    const idCard = await IDCard.findByIdAndDelete(req.params.id);
    if (!idCard) return res.status(404).json({ success: false, message: "ID Card not found" });
    return res.status(200).json({ success: true, message: "ID Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete ID card", error: error.message });
  }
};

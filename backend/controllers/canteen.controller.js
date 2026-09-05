import Canteen from "../models/canteen.model.js";

export const createCanteenItem = async (req, res) => {
  try {
    const item = await Canteen.create(req.body);
    await item.populate({ path: "schoolId", select: "name code" });
    return res.status(201).json({ success: true, message: "Canteen item created successfully", item });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate item code" });
    return res.status(500).json({ success: false, message: "Failed to create canteen item", error: error.message });
  }
};

export const getAllCanteenItems = async (req, res) => {
  try {
    const { schoolId, category, status, isVegetarian } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (isVegetarian !== undefined) filter.isVegetarian = isVegetarian === "true";

    const items = await Canteen.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .sort({ category: 1, itemName: 1 });

    return res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch canteen items", error: error.message });
  }
};

export const getCanteenItemById = async (req, res) => {
  try {
    const item = await Canteen.findById(req.params.id).populate({ path: "schoolId", select: "name code" });
    if (!item) return res.status(404).json({ success: false, message: "Canteen item not found" });
    return res.status(200).json({ success: true, item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch canteen item", error: error.message });
  }
};

export const updateCanteenItem = async (req, res) => {
  try {
    const item = await Canteen.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" });
    if (!item) return res.status(404).json({ success: false, message: "Canteen item not found" });
    return res.status(200).json({ success: true, message: "Canteen item updated successfully", item });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update canteen item", error: error.message });
  }
};

export const deleteCanteenItem = async (req, res) => {
  try {
    const item = await Canteen.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Canteen item not found" });
    return res.status(200).json({ success: true, message: "Canteen item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete canteen item", error: error.message });
  }
};

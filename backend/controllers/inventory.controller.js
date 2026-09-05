import mongoose from "mongoose";
import Inventory from "../models/inventory.model.js";
import School from "../models/school.model.js";

export const createInventory = async (req, res) => {
  try {
    const { schoolId, itemName, itemCode, category, quantity, unitPrice, supplier, purchaseDate, warrantyExpiry, location, condition, status, description } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ success: false, message: "School not found" });

    const duplicateItemCode = await Inventory.findOne({ schoolId, itemCode: itemCode.toUpperCase() });
    if (duplicateItemCode) return res.status(409).json({ success: false, message: "Item code already exists in this school" });

    const inventory = await Inventory.create({ schoolId, itemName, itemCode, category, quantity, unitPrice, supplier, purchaseDate, warrantyExpiry, location, condition, status, description });

    await inventory.populate({ path: "schoolId", select: "name code email phone status" });

    return res.status(201).json({ success: true, message: "Inventory item created successfully", inventory });
  } catch (error) {
    console.error("Create Inventory Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate item code" });
    return res.status(500).json({ success: false, message: "Failed to create inventory item", error: error.message });
  }
};

export const getAllInventory = async (req, res) => {
  try {
    const { schoolId, category, status, condition } = req.query;
    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) return res.status(400).json({ success: false, message: "Invalid School ID" });
      filter.schoolId = schoolId;
    }
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (condition) filter.condition = condition;

    const inventory = await Inventory.find(filter)
      .populate({ path: "schoolId", select: "name code email phone status" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Inventory fetched successfully", count: inventory.length, inventory });
  } catch (error) {
    console.error("Get All Inventory Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch inventory", error: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Inventory ID" });

    const inventory = await Inventory.findById(id).populate({ path: "schoolId", select: "name code email phone status" });
    if (!inventory) return res.status(404).json({ success: false, message: "Inventory item not found" });

    return res.status(200).json({ success: true, message: "Inventory item fetched successfully", inventory });
  } catch (error) {
    console.error("Get Inventory By ID Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch inventory item", error: error.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Inventory ID" });

    const inventory = await Inventory.findById(id);
    if (!inventory) return res.status(404).json({ success: false, message: "Inventory item not found" });

    const updateData = req.body;
    Object.keys(updateData).forEach((key) => {
      inventory[key] = updateData[key];
    });

    await inventory.save();
    await inventory.populate({ path: "schoolId", select: "name code email phone status" });

    return res.status(200).json({ success: true, message: "Inventory item updated successfully", inventory });
  } catch (error) {
    console.error("Update Inventory Error:", error);
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate item code" });
    return res.status(500).json({ success: false, message: "Failed to update inventory item", error: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Inventory ID" });

    const inventory = await Inventory.findByIdAndDelete(id);
    if (!inventory) return res.status(404).json({ success: false, message: "Inventory item not found" });

    return res.status(200).json({ success: true, message: "Inventory item deleted successfully" });
  } catch (error) {
    console.error("Delete Inventory Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete inventory item", error: error.message });
  }
};

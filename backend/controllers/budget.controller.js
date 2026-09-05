import Budget from "../models/budget.model.js";

export const createBudget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    await budget.populate([
      { path: "schoolId", select: "name code" },
      { path: "createdBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Budget created successfully", budget });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create budget", error: error.message });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const { schoolId, category, fiscalYear, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (category) filter.category = category;
    if (fiscalYear) filter.fiscalYear = fiscalYear;
    if (status) filter.status = status;

    const budgets = await Budget.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: budgets.length, budgets });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch budgets", error: error.message });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" });
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    return res.status(200).json({ success: true, budget });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch budget", error: error.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "createdBy", select: "name email role" });
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    return res.status(200).json({ success: true, message: "Budget updated successfully", budget });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update budget", error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) return res.status(404).json({ success: false, message: "Budget not found" });
    return res.status(200).json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete budget", error: error.message });
  }
};

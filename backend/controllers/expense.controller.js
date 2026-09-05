import Expense from "../models/expense.model.js";

export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    await expense.populate([
      { path: "schoolId", select: "name code" },
      { path: "approvedBy", select: "name email role" },
      { path: "paidBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Expense created successfully", expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create expense", error: error.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const { schoolId, expenseCategory, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (expenseCategory) filter.expenseCategory = expenseCategory;
    if (status) filter.status = status;

    const expenses = await Expense.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "approvedBy", select: "name email role" })
      .populate({ path: "paidBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: expenses.length, expenses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch expenses", error: error.message });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "approvedBy", select: "name email role" })
      .populate({ path: "paidBy", select: "name email role" });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return res.status(200).json({ success: true, expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch expense", error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "approvedBy", select: "name email role" })
      .populate({ path: "paidBy", select: "name email role" });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return res.status(200).json({ success: true, message: "Expense updated successfully", expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    return res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete expense", error: error.message });
  }
};

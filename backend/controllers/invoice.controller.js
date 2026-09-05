import Invoice from "../models/invoice.model.js";

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    await invoice.populate([
      { path: "schoolId", select: "name code" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "createdBy", select: "name email role" },
    ]);
    return res.status(201).json({ success: true, message: "Invoice created successfully", invoice });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate invoice number" });
    return res.status(500).json({ success: false, message: "Failed to create invoice", error: error.message });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const { schoolId, studentId, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (studentId) filter.studentId = studentId;
    if (status) filter.status = status;

    const invoices = await Invoice.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "createdBy", select: "name email role" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: invoices.length, invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch invoices", error: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "createdBy", select: "name email role" });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    return res.status(200).json({ success: true, invoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch invoice", error: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "createdBy", select: "name email role" });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    return res.status(200).json({ success: true, message: "Invoice updated successfully", invoice });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update invoice", error: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    return res.status(200).json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete invoice", error: error.message });
  }
};

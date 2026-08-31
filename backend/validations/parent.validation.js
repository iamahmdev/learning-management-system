import Parent from "../models/parent.model.js";

// =====================================================
// CREATE PARENT
// =====================================================

export const createParent = async (req, res) => {
  try {
    const parent = await Parent.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Parent created successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Create Parent Error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Parent ID already exists in this school",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({
        success: false,
        message: "Parent validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create parent",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL PARENTS
// =====================================================

export const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find()
      .populate("userId")
      .populate("schoolId")
      .populate("students")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Parents fetched successfully",
      count: parents.length,
      data: parents,
    });
  } catch (error) {
    console.error("Get All Parents Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch parents",
      error: error.message,
    });
  }
};

// =====================================================
// GET PARENT BY ID
// =====================================================

export const getParentById = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await Parent.findById(id)
      .populate("userId")
      .populate("schoolId")
      .populate("students");

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parent fetched successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Get Parent By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch parent",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PARENT
// =====================================================

export const updateParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await Parent.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("userId")
      .populate("schoolId")
      .populate("students");

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parent updated successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Update Parent Error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Parent ID already exists in this school",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({
        success: false,
        message: "Parent validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update parent",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PARENT
// =====================================================

export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await Parent.findByIdAndDelete(id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parent deleted successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Delete Parent Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete parent",
      error: error.message,
    });
  }
};
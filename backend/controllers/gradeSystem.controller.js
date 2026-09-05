import GradeSystem from "../models/gradeSystem.model.js";

// =====================================================
// CREATE GRADE SYSTEM
// =====================================================
export const createGradeSystem = async (req, res) => {
  try {
    const gradeSystem = await GradeSystem.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Grade system created successfully",
      data: gradeSystem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL GRADE SYSTEMS
// =====================================================
export const getAllGradeSystems = async (req, res) => {
  try {
    const {
      schoolId,
      gradeType,
      applicableFor,
      isDefault,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (gradeType) query.gradeType = gradeType;
    if (applicableFor) query.applicableFor = applicableFor;
    if (isDefault !== undefined) query.isDefault = isDefault === "true";
    if (status) query.status = status;

    const gradeSystems = await GradeSystem.find(query)
      .populate("schoolId", "name code")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await GradeSystem.countDocuments(query);

    res.status(200).json({
      success: true,
      data: gradeSystems,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET GRADE SYSTEM BY ID
// =====================================================
export const getGradeSystemById = async (req, res) => {
  try {
    const gradeSystem = await GradeSystem.findById(req.params.id)
      .populate("schoolId", "name code")
      .populate("createdBy", "name email");

    if (!gradeSystem) {
      return res.status(404).json({
        success: false,
        message: "Grade system not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gradeSystem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE GRADE SYSTEM
// =====================================================
export const updateGradeSystem = async (req, res) => {
  try {
    const gradeSystem = await GradeSystem.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!gradeSystem) {
      return res.status(404).json({
        success: false,
        message: "Grade system not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Grade system updated successfully",
      data: gradeSystem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE GRADE SYSTEM
// =====================================================
export const deleteGradeSystem = async (req, res) => {
  try {
    const gradeSystem = await GradeSystem.findByIdAndDelete(req.params.id);

    if (!gradeSystem) {
      return res.status(404).json({
        success: false,
        message: "Grade system not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Grade system deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

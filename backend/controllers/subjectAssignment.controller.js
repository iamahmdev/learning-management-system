import SubjectAssignment from "../models/subjectAssignment.model.js";

// =====================================================
// CREATE SUBJECT ASSIGNMENT
// =====================================================
export const createSubjectAssignment = async (req, res) => {
  try {
    const assignment = await SubjectAssignment.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Subject assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL SUBJECT ASSIGNMENTS
// =====================================================
export const getAllSubjectAssignments = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      teacherId,
      classId,
      sectionId,
      subjectId,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (academicYearId) query.academicYearId = academicYearId;
    if (teacherId) query.teacherId = teacherId;
    if (classId) query.classId = classId;
    if (sectionId) query.sectionId = sectionId;
    if (subjectId) query.subjectId = subjectId;
    if (status) query.status = status;

    const assignments = await SubjectAssignment.find(query)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("teacherId")
      .populate("classId", "name code")
      .populate("sectionId", "name code")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SubjectAssignment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: assignments,
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
// GET SUBJECT ASSIGNMENT BY ID
// =====================================================
export const getSubjectAssignmentById = async (req, res) => {
  try {
    const assignment = await SubjectAssignment.findById(req.params.id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("teacherId")
      .populate("classId", "name code")
      .populate("sectionId", "name code")
      .populate("subjectId", "name code")
      .populate("createdBy", "name email");

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Subject assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE SUBJECT ASSIGNMENT
// =====================================================
export const updateSubjectAssignment = async (req, res) => {
  try {
    const assignment = await SubjectAssignment.findByIdAndUpdate(
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

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Subject assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE SUBJECT ASSIGNMENT
// =====================================================
export const deleteSubjectAssignment = async (req, res) => {
  try {
    const assignment = await SubjectAssignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Subject assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject assignment deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

import AcademicCalendar from "../models/academicCalendar.model.js";

// =====================================================
// CREATE ACADEMIC CALENDAR
// =====================================================
export const createAcademicCalendar = async (req, res) => {
  try {
    const calendar = await AcademicCalendar.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Academic calendar created successfully",
      data: calendar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL ACADEMIC CALENDARS
// =====================================================
export const getAllAcademicCalendars = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      eventType,
      month,
      status,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    if (schoolId) query.schoolId = schoolId;
    if (academicYearId) query.academicYearId = academicYearId;
    if (eventType) query.eventType = eventType;
    if (status) query.status = status;

    // Filter by month if provided
    if (month) {
      const year = new Date().getFullYear();
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.startDate = { $gte: startDate, $lte: endDate };
    }

    const calendars = await AcademicCalendar.find(query)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("createdBy", "name email")
      .sort({ startDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await AcademicCalendar.countDocuments(query);

    res.status(200).json({
      success: true,
      data: calendars,
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
// GET ACADEMIC CALENDAR BY ID
// =====================================================
export const getAcademicCalendarById = async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findById(req.params.id)
      .populate("schoolId", "name code")
      .populate("academicYearId", "name")
      .populate("createdBy", "name email");

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Academic calendar not found",
      });
    }

    res.status(200).json({
      success: true,
      data: calendar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE ACADEMIC CALENDAR
// =====================================================
export const updateAcademicCalendar = async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findByIdAndUpdate(
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

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Academic calendar not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Academic calendar updated successfully",
      data: calendar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE ACADEMIC CALENDAR
// =====================================================
export const deleteAcademicCalendar = async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findByIdAndDelete(req.params.id);

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Academic calendar not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Academic calendar deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

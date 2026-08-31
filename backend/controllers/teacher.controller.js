import Teacher from "../models/teacher.model.js";

// =====================================================
// CREATE TEACHER
// =====================================================

export const createTeacher = async (req, res) => {
  try {
    const {
      userId,
      schoolId,
      employeeId,
      qualification,
      specialization,
      joiningDate,
      experience,
      employmentType,
      salary,
      emergencyContact,
      status,
    } = req.body;

    // =================================================
    // CHECK EXISTING USER PROFILE
    // =================================================

    const existingUser = await Teacher.findOne({
      userId,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Teacher profile already exists for this user",
      });
    }

    // =================================================
    // CHECK DUPLICATE EMPLOYEE ID
    // =================================================

    const normalizedEmployeeId =
      employeeId.trim().toUpperCase();

    const existingEmployee = await Teacher.findOne({
      schoolId,
      employeeId: normalizedEmployeeId,
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message:
          "Employee ID already exists in this school",
      });
    }

    // =================================================
    // CREATE TEACHER
    // =================================================

    const teacher = await Teacher.create({
      userId,
      schoolId,
      employeeId: normalizedEmployeeId,
      qualification: qualification.trim(),
      specialization:
        specialization?.trim() || "",
      joiningDate,
      experience,
      employmentType,
      salary,
      emergencyContact,
      status,
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    // =================================================
    // DUPLICATE KEY ERROR
    // =================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Teacher with this information already exists",
      });
    }

    // =================================================
    // MONGOOSE VALIDATION ERROR
    // =================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Teacher validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    // =================================================
    // SERVER ERROR
    // =================================================

    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL TEACHERS
// =====================================================

export const getAllTeachers = async (req, res) => {
  try {
    const {
      schoolId,
      status,
      employmentType,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // =================================================
    // PAGINATION
    // =================================================

    const pageNumber = Math.max(
      parseInt(page, 10) || 1,
      1
    );

    const limitNumber = Math.min(
      Math.max(parseInt(limit, 10) || 10, 1),
      100
    );

    const skip = (pageNumber - 1) * limitNumber;

    // =================================================
    // BUILD FILTER
    // =================================================

    const filter = {};

    if (schoolId) {
      filter.schoolId = schoolId;
    }

    if (status) {
      filter.status = status;
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    // =================================================
    // SEARCH
    // =================================================

    if (search?.trim()) {
      const searchValue = search.trim();

      filter.$or = [
        {
          employeeId: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          qualification: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          specialization: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // =================================================
    // FETCH TEACHERS + COUNT
    // =================================================

    const [teachers, totalTeachers] =
      await Promise.all([
        Teacher.find(filter)
          .populate("userId")
          .populate("schoolId")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),

        Teacher.countDocuments(filter),
      ]);

    // =================================================
    // PAGINATION INFO
    // =================================================

    const totalPages = Math.ceil(
      totalTeachers / limitNumber
    );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      count: teachers.length,
      data: teachers,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalTeachers,
        limit: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

// =====================================================
// GET TEACHER BY ID
// =====================================================

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id)
      .populate("userId")
      .populate("schoolId");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Teacher fetched successfully",
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE TEACHER
// =====================================================

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // =================================================
    // FIND EXISTING TEACHER
    // =================================================

    const existingTeacher =
      await Teacher.findById(id);

    if (!existingTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // =================================================
    // PREVENT DUPLICATE USER ID
    // =================================================

    if (req.body.userId) {
      const existingUser =
        await Teacher.findOne({
          userId: req.body.userId,
          _id: { $ne: id },
        });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "Teacher profile already exists for this user",
        });
      }
    }

    // =================================================
    // PREVENT DUPLICATE EMPLOYEE ID
    // =================================================

    if (req.body.employeeId) {
      const employeeId =
        req.body.employeeId
          .trim()
          .toUpperCase();

      const duplicateEmployee =
        await Teacher.findOne({
          _id: { $ne: id },
          schoolId:
            req.body.schoolId ||
            existingTeacher.schoolId,
          employeeId,
        });

      if (duplicateEmployee) {
        return res.status(409).json({
          success: false,
          message:
            "Employee ID already exists in this school",
        });
      }

      req.body.employeeId = employeeId;
    }

    // =================================================
    // NORMALIZE STRING FIELDS
    // =================================================

    if (req.body.qualification) {
      req.body.qualification =
        req.body.qualification.trim();
    }

    if (req.body.specialization !== undefined) {
      req.body.specialization =
        req.body.specialization.trim();
    }

    // =================================================
    // PROTECT SYSTEM FIELDS
    // =================================================

    delete req.body._id;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    // =================================================
    // UPDATE TEACHER
    // =================================================

    const teacher =
      await Teacher.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("userId")
        .populate("schoolId");

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    // =================================================
    // DUPLICATE KEY ERROR
    // =================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Teacher with this information already exists",
        error: error.message,
      });
    }

    // =================================================
    // MONGOOSE VALIDATION ERROR
    // =================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Teacher validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE TEACHER
// =====================================================

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // =================================================
    // FIND TEACHER
    // =================================================

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // =================================================
    // DELETE TEACHER
    // =================================================

    await Teacher.findByIdAndDelete(id);

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};
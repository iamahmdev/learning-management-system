import mongoose from "mongoose";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Check MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validation error response
const validationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

// =====================================================
// CONSTANTS
// =====================================================

const allowedEmploymentTypes = [
  "full_time",
  "part_time",
  "contract",
  "temporary",
];

const allowedStatuses = [
  "active",
  "inactive",
  "on_leave",
  "terminated",
];

// =====================================================
// CREATE TEACHER VALIDATION
// =====================================================

export const validateCreateTeacher = (req, res, next) => {
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
    // USER ID
    // =================================================

    if (!userId) {
      return validationError(res, "User ID is required");
    }

    if (!isValidObjectId(userId)) {
      return validationError(res, "Invalid user ID");
    }

    // =================================================
    // SCHOOL ID
    // =================================================

    if (!schoolId) {
      return validationError(res, "School ID is required");
    }

    if (!isValidObjectId(schoolId)) {
      return validationError(res, "Invalid school ID");
    }

    // =================================================
    // EMPLOYEE ID
    // =================================================

    if (!employeeId || typeof employeeId !== "string") {
      return validationError(res, "Employee ID is required");
    }

    const normalizedEmployeeId = employeeId.trim();

    if (!normalizedEmployeeId) {
      return validationError(res, "Employee ID cannot be empty");
    }

    if (normalizedEmployeeId.length > 30) {
      return validationError(
        res,
        "Employee ID cannot exceed 30 characters"
      );
    }

    // =================================================
    // QUALIFICATION
    // =================================================

    if (!qualification || typeof qualification !== "string") {
      return validationError(res, "Qualification is required");
    }

    const normalizedQualification = qualification.trim();

    if (!normalizedQualification) {
      return validationError(
        res,
        "Qualification cannot be empty"
      );
    }

    if (normalizedQualification.length > 150) {
      return validationError(
        res,
        "Qualification cannot exceed 150 characters"
      );
    }

    // =================================================
    // SPECIALIZATION
    // =================================================

    if (specialization !== undefined) {
      if (typeof specialization !== "string") {
        return validationError(
          res,
          "Specialization must be a string"
        );
      }

      if (specialization.trim().length > 150) {
        return validationError(
          res,
          "Specialization cannot exceed 150 characters"
        );
      }
    }

    // =================================================
    // JOINING DATE
    // =================================================

    if (!joiningDate) {
      return validationError(res, "Joining date is required");
    }

    const parsedJoiningDate = new Date(joiningDate);

    if (Number.isNaN(parsedJoiningDate.getTime())) {
      return validationError(
        res,
        "Invalid joining date"
      );
    }

    // =================================================
    // EXPERIENCE
    // =================================================

    if (experience !== undefined) {
      if (
        typeof experience !== "number" ||
        !Number.isFinite(experience)
      ) {
        return validationError(
          res,
          "Experience must be a valid number"
        );
      }

      if (experience < 0) {
        return validationError(
          res,
          "Experience cannot be negative"
        );
      }
    }

    // =================================================
    // EMPLOYMENT TYPE
    // =================================================

    if (employmentType !== undefined) {
      if (!allowedEmploymentTypes.includes(employmentType)) {
        return validationError(
          res,
          "Invalid employment type"
        );
      }
    }

    // =================================================
    // SALARY
    // =================================================

    if (salary !== undefined) {
      if (
        typeof salary !== "number" ||
        !Number.isFinite(salary)
      ) {
        return validationError(
          res,
          "Salary must be a valid number"
        );
      }

      if (salary < 0) {
        return validationError(
          res,
          "Salary cannot be negative"
        );
      }
    }

    // =================================================
    // EMERGENCY CONTACT
    // =================================================

    if (emergencyContact !== undefined) {
      if (
        typeof emergencyContact !== "object" ||
        emergencyContact === null ||
        Array.isArray(emergencyContact)
      ) {
        return validationError(
          res,
          "Emergency contact must be an object"
        );
      }

      const {
        name,
        relationship,
        phone,
      } = emergencyContact;

      // Name
      if (name !== undefined) {
        if (typeof name !== "string") {
          return validationError(
            res,
            "Emergency contact name must be a string"
          );
        }

        if (name.trim().length > 100) {
          return validationError(
            res,
            "Emergency contact name cannot exceed 100 characters"
          );
        }
      }

      // Relationship
      if (relationship !== undefined) {
        if (typeof relationship !== "string") {
          return validationError(
            res,
            "Emergency contact relationship must be a string"
          );
        }

        if (relationship.trim().length > 50) {
          return validationError(
            res,
            "Emergency contact relationship cannot exceed 50 characters"
          );
        }
      }

      // Phone
      if (phone !== undefined) {
        if (typeof phone !== "string") {
          return validationError(
            res,
            "Emergency contact phone must be a string"
          );
        }
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return validationError(
          res,
          "Invalid teacher status"
        );
      }
    }

    // =================================================
    // CONTINUE
    // =================================================

    next();
  } catch (error) {
    console.error(
      "Create Teacher Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Teacher validation failed",
    });
  }
};

// =====================================================
// UPDATE TEACHER VALIDATION
// =====================================================

export const validateUpdateTeacher = (req, res, next) => {
  try {
    const { id } = req.params;

    // =================================================
    // TEACHER DOCUMENT ID
    // =================================================

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid teacher ID"
      );
    }

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
    // USER ID
    // =================================================

    if (userId !== undefined) {
      if (!isValidObjectId(userId)) {
        return validationError(
          res,
          "Invalid user ID"
        );
      }
    }

    // =================================================
    // SCHOOL ID
    // =================================================

    if (schoolId !== undefined) {
      if (!isValidObjectId(schoolId)) {
        return validationError(
          res,
          "Invalid school ID"
        );
      }
    }

    // =================================================
    // EMPLOYEE ID
    // =================================================

    if (employeeId !== undefined) {
      if (
        typeof employeeId !== "string" ||
        !employeeId.trim()
      ) {
        return validationError(
          res,
          "Employee ID cannot be empty"
        );
      }

      if (employeeId.trim().length > 30) {
        return validationError(
          res,
          "Employee ID cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // QUALIFICATION
    // =================================================

    if (qualification !== undefined) {
      if (
        typeof qualification !== "string" ||
        !qualification.trim()
      ) {
        return validationError(
          res,
          "Qualification cannot be empty"
        );
      }

      if (qualification.trim().length > 150) {
        return validationError(
          res,
          "Qualification cannot exceed 150 characters"
        );
      }
    }

    // =================================================
    // SPECIALIZATION
    // =================================================

    if (specialization !== undefined) {
      if (typeof specialization !== "string") {
        return validationError(
          res,
          "Specialization must be a string"
        );
      }

      if (specialization.trim().length > 150) {
        return validationError(
          res,
          "Specialization cannot exceed 150 characters"
        );
      }
    }

    // =================================================
    // JOINING DATE
    // =================================================

    if (joiningDate !== undefined) {
      const parsedJoiningDate = new Date(joiningDate);

      if (Number.isNaN(parsedJoiningDate.getTime())) {
        return validationError(
          res,
          "Invalid joining date"
        );
      }
    }

    // =================================================
    // EXPERIENCE
    // =================================================

    if (experience !== undefined) {
      if (
        typeof experience !== "number" ||
        !Number.isFinite(experience)
      ) {
        return validationError(
          res,
          "Experience must be a valid number"
        );
      }

      if (experience < 0) {
        return validationError(
          res,
          "Experience cannot be negative"
        );
      }
    }

    // =================================================
    // EMPLOYMENT TYPE
    // =================================================

    if (employmentType !== undefined) {
      if (!allowedEmploymentTypes.includes(employmentType)) {
        return validationError(
          res,
          "Invalid employment type"
        );
      }
    }

    // =================================================
    // SALARY
    // =================================================

    if (salary !== undefined) {
      if (
        typeof salary !== "number" ||
        !Number.isFinite(salary)
      ) {
        return validationError(
          res,
          "Salary must be a valid number"
        );
      }

      if (salary < 0) {
        return validationError(
          res,
          "Salary cannot be negative"
        );
      }
    }

    // =================================================
    // EMERGENCY CONTACT
    // =================================================

    if (emergencyContact !== undefined) {
      if (
        typeof emergencyContact !== "object" ||
        emergencyContact === null ||
        Array.isArray(emergencyContact)
      ) {
        return validationError(
          res,
          "Emergency contact must be an object"
        );
      }

      const {
        name,
        relationship,
        phone,
      } = emergencyContact;

      // Name
      if (name !== undefined) {
        if (typeof name !== "string") {
          return validationError(
            res,
            "Emergency contact name must be a string"
          );
        }

        if (name.trim().length > 100) {
          return validationError(
            res,
            "Emergency contact name cannot exceed 100 characters"
          );
        }
      }

      // Relationship
      if (relationship !== undefined) {
        if (typeof relationship !== "string") {
          return validationError(
            res,
            "Emergency contact relationship must be a string"
          );
        }

        if (relationship.trim().length > 50) {
          return validationError(
            res,
            "Emergency contact relationship cannot exceed 50 characters"
          );
        }
      }

      // Phone
      if (phone !== undefined) {
        if (typeof phone !== "string") {
          return validationError(
            res,
            "Emergency contact phone must be a string"
          );
        }
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) {
        return validationError(
          res,
          "Invalid teacher status"
        );
      }
    }

    // =================================================
    // CONTINUE
    // =================================================

    next();
  } catch (error) {
    console.error(
      "Update Teacher Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Teacher validation failed",
    });
  }
};

// =====================================================
// TEACHER ID VALIDATION
// =====================================================

export const validateTeacherId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid teacher ID"
      );
    }

    next();
  } catch (error) {
    console.error(
      "Teacher ID Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Teacher ID validation failed",
    });
  }
};
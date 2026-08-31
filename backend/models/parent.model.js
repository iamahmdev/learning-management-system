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

// Email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// =====================================================
// CREATE PARENT VALIDATION
// =====================================================

export const validateCreateParent = (req, res, next) => {
  try {
    const {
      userId,
      schoolId,
      parentId,
      relationship,
      occupation,
      nationalId,
      alternatePhone,
      address,
      students,
      status,
    } = req.body;

    // =================================================
    // USER ID
    // =================================================

    if (!userId) {
      return validationError(
        res,
        "User ID is required"
      );
    }

    if (!isValidObjectId(userId)) {
      return validationError(
        res,
        "Invalid user ID"
      );
    }

    // =================================================
    // SCHOOL ID
    // =================================================

    if (!schoolId) {
      return validationError(
        res,
        "School ID is required"
      );
    }

    if (!isValidObjectId(schoolId)) {
      return validationError(
        res,
        "Invalid school ID"
      );
    }

    // =================================================
    // PARENT ID
    // =================================================

    if (!parentId || typeof parentId !== "string") {
      return validationError(
        res,
        "Parent ID is required"
      );
    }

    const normalizedParentId = parentId.trim();

    if (!normalizedParentId) {
      return validationError(
        res,
        "Parent ID cannot be empty"
      );
    }

    if (normalizedParentId.length > 30) {
      return validationError(
        res,
        "Parent ID cannot exceed 30 characters"
      );
    }

    // =================================================
    // RELATIONSHIP
    // =================================================

    if (!relationship) {
      return validationError(
        res,
        "Relationship is required"
      );
    }

    const allowedRelationships = [
      "father",
      "mother",
      "guardian",
      "grandfather",
      "grandmother",
      "other",
    ];

    if (!allowedRelationships.includes(relationship)) {
      return validationError(
        res,
        "Invalid parent relationship"
      );
    }

    // =================================================
    // OCCUPATION
    // =================================================

    if (occupation !== undefined) {
      if (typeof occupation !== "string") {
        return validationError(
          res,
          "Occupation must be a string"
        );
      }

      if (occupation.trim().length > 100) {
        return validationError(
          res,
          "Occupation cannot exceed 100 characters"
        );
      }
    }

    // =================================================
    // NATIONAL ID
    // =================================================

    if (nationalId !== undefined) {
      if (typeof nationalId !== "string") {
        return validationError(
          res,
          "National ID must be a string"
        );
      }

      if (nationalId.trim().length > 30) {
        return validationError(
          res,
          "National ID cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ALTERNATE PHONE
    // =================================================

    if (alternatePhone !== undefined) {
      if (typeof alternatePhone !== "string") {
        return validationError(
          res,
          "Alternate phone must be a string"
        );
      }

      if (alternatePhone.trim().length > 30) {
        return validationError(
          res,
          "Alternate phone cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (address !== undefined) {
      if (
        typeof address !== "object" ||
        address === null ||
        Array.isArray(address)
      ) {
        return validationError(
          res,
          "Address must be an object"
        );
      }

      const {
        street,
        city,
        state,
        country,
        postalCode,
      } = address;

      // Street
      if (street !== undefined) {
        if (typeof street !== "string") {
          return validationError(
            res,
            "Street must be a string"
          );
        }

        if (street.trim().length > 200) {
          return validationError(
            res,
            "Street cannot exceed 200 characters"
          );
        }
      }

      // City
      if (city !== undefined) {
        if (typeof city !== "string") {
          return validationError(
            res,
            "City must be a string"
          );
        }

        if (city.trim().length > 100) {
          return validationError(
            res,
            "City cannot exceed 100 characters"
          );
        }
      }

      // State
      if (state !== undefined) {
        if (typeof state !== "string") {
          return validationError(
            res,
            "State must be a string"
          );
        }

        if (state.trim().length > 100) {
          return validationError(
            res,
            "State cannot exceed 100 characters"
          );
        }
      }

      // Country
      if (country !== undefined) {
        if (typeof country !== "string") {
          return validationError(
            res,
            "Country must be a string"
          );
        }

        if (country.trim().length > 100) {
          return validationError(
            res,
            "Country cannot exceed 100 characters"
          );
        }
      }

      // Postal Code
      if (postalCode !== undefined) {
        if (typeof postalCode !== "string") {
          return validationError(
            res,
            "Postal code must be a string"
          );
        }

        if (postalCode.trim().length > 20) {
          return validationError(
            res,
            "Postal code cannot exceed 20 characters"
          );
        }
      }
    }

    // =================================================
    // STUDENTS
    // =================================================

    if (students !== undefined) {
      if (!Array.isArray(students)) {
        return validationError(
          res,
          "Students must be an array"
        );
      }

      for (const studentId of students) {
        if (!isValidObjectId(studentId)) {
          return validationError(
            res,
            "One or more student IDs are invalid"
          );
        }
      }

      // Prevent duplicate student IDs
      const uniqueStudents = new Set(
        students.map((student) => student.toString())
      );

      if (uniqueStudents.size !== students.length) {
        return validationError(
          res,
          "Duplicate student IDs are not allowed"
        );
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (status !== undefined) {
      const allowedStatuses = [
        "active",
        "inactive",
      ];

      if (!allowedStatuses.includes(status)) {
        return validationError(
          res,
          "Invalid parent status"
        );
      }
    }

    // Continue
    next();
  } catch (error) {
    console.error(
      "Create Parent Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Parent validation failed",
    });
  }
};

// =====================================================
// UPDATE PARENT VALIDATION
// =====================================================

export const validateUpdateParent = (req, res, next) => {
  try {
    const { id } = req.params;

    // =================================================
    // PARENT ID PARAMETER
    // =================================================

    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid parent ID"
      );
    }

    const {
      userId,
      schoolId,
      parentId,
      relationship,
      occupation,
      nationalId,
      alternatePhone,
      address,
      students,
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
    // PARENT ID
    // =================================================

    if (parentId !== undefined) {
      if (
        typeof parentId !== "string" ||
        !parentId.trim()
      ) {
        return validationError(
          res,
          "Parent ID cannot be empty"
        );
      }

      if (parentId.trim().length > 30) {
        return validationError(
          res,
          "Parent ID cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // RELATIONSHIP
    // =================================================

    if (relationship !== undefined) {
      const allowedRelationships = [
        "father",
        "mother",
        "guardian",
        "grandfather",
        "grandmother",
        "other",
      ];

      if (!allowedRelationships.includes(relationship)) {
        return validationError(
          res,
          "Invalid parent relationship"
        );
      }
    }

    // =================================================
    // OCCUPATION
    // =================================================

    if (occupation !== undefined) {
      if (typeof occupation !== "string") {
        return validationError(
          res,
          "Occupation must be a string"
        );
      }

      if (occupation.trim().length > 100) {
        return validationError(
          res,
          "Occupation cannot exceed 100 characters"
        );
      }
    }

    // =================================================
    // NATIONAL ID
    // =================================================

    if (nationalId !== undefined) {
      if (typeof nationalId !== "string") {
        return validationError(
          res,
          "National ID must be a string"
        );
      }

      if (nationalId.trim().length > 30) {
        return validationError(
          res,
          "National ID cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ALTERNATE PHONE
    // =================================================

    if (alternatePhone !== undefined) {
      if (typeof alternatePhone !== "string") {
        return validationError(
          res,
          "Alternate phone must be a string"
        );
      }

      if (alternatePhone.trim().length > 30) {
        return validationError(
          res,
          "Alternate phone cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (address !== undefined) {
      if (
        typeof address !== "object" ||
        address === null ||
        Array.isArray(address)
      ) {
        return validationError(
          res,
          "Address must be an object"
        );
      }

      const {
        street,
        city,
        state,
        country,
        postalCode,
      } = address;

      // Street
      if (street !== undefined) {
        if (typeof street !== "string") {
          return validationError(
            res,
            "Street must be a string"
          );
        }

        if (street.trim().length > 200) {
          return validationError(
            res,
            "Street cannot exceed 200 characters"
          );
        }
      }

      // City
      if (city !== undefined) {
        if (typeof city !== "string") {
          return validationError(
            res,
            "City must be a string"
          );
        }

        if (city.trim().length > 100) {
          return validationError(
            res,
            "City cannot exceed 100 characters"
          );
        }
      }

      // State
      if (state !== undefined) {
        if (typeof state !== "string") {
          return validationError(
            res,
            "State must be a string"
          );
        }

        if (state.trim().length > 100) {
          return validationError(
            res,
            "State cannot exceed 100 characters"
          );
        }
      }

      // Country
      if (country !== undefined) {
        if (typeof country !== "string") {
          return validationError(
            res,
            "Country must be a string"
          );
        }

        if (country.trim().length > 100) {
          return validationError(
            res,
            "Country cannot exceed 100 characters"
          );
        }
      }

      // Postal Code
      if (postalCode !== undefined) {
        if (typeof postalCode !== "string") {
          return validationError(
            res,
            "Postal code must be a string"
          );
        }

        if (postalCode.trim().length > 20) {
          return validationError(
            res,
            "Postal code cannot exceed 20 characters"
          );
        }
      }
    }

    // =================================================
    // STUDENTS
    // =================================================

    if (students !== undefined) {
      if (!Array.isArray(students)) {
        return validationError(
          res,
          "Students must be an array"
        );
      }

      for (const studentId of students) {
        if (!isValidObjectId(studentId)) {
          return validationError(
            res,
            "One or more student IDs are invalid"
          );
        }
      }

      // Prevent duplicate student IDs
      const uniqueStudents = new Set(
        students.map((student) => student.toString())
      );

      if (uniqueStudents.size !== students.length) {
        return validationError(
          res,
          "Duplicate student IDs are not allowed"
        );
      }
    }

    // =================================================
    // STATUS
    // =================================================

    if (status !== undefined) {
      const allowedStatuses = [
        "active",
        "inactive",
      ];

      if (!allowedStatuses.includes(status)) {
        return validationError(
          res,
          "Invalid parent status"
        );
      }
    }

    // Continue
    next();
  } catch (error) {
    console.error(
      "Update Parent Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Parent validation failed",
    });
  }
};

// =====================================================
// PARENT ID VALIDATION
// =====================================================

export const validateParentId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    next();
  } catch (error) {
    console.error(
      "Parent ID Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Parent ID validation failed",
    });
  }
};
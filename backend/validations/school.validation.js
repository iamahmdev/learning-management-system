import mongoose from "mongoose";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Check MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validation Error Response
const validationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

// Email Validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// =====================================================
// CREATE SCHOOL VALIDATION
// =====================================================

export const validateCreateSchool = (req, res, next) => {
  try {
    const {
      name,
      code,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      website,
      logo,
      principal,
      establishedDate,
      schoolType,
      status,
    } = req.body;

    // =================================================
    // SCHOOL NAME
    // =================================================

    if (!name || typeof name !== "string") {
      return validationError(
        res,
        "School name is required"
      );
    }

    const normalizedName = name.trim();

    if (normalizedName.length < 2) {
      return validationError(
        res,
        "School name must be at least 2 characters"
      );
    }

    if (normalizedName.length > 100) {
      return validationError(
        res,
        "School name cannot exceed 100 characters"
      );
    }

    // =================================================
    // SCHOOL CODE
    // =================================================

    if (!code || typeof code !== "string") {
      return validationError(
        res,
        "School code is required"
      );
    }

    const normalizedCode = code.trim();

    if (!normalizedCode) {
      return validationError(
        res,
        "School code cannot be empty"
      );
    }

    if (normalizedCode.length > 50) {
      return validationError(
        res,
        "School code cannot exceed 50 characters"
      );
    }

    // =================================================
    // EMAIL
    // =================================================

    if (!email || typeof email !== "string") {
      return validationError(
        res,
        "School email is required"
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return validationError(
        res,
        "Please provide a valid school email"
      );
    }

    // =================================================
    // PHONE
    // =================================================

    if (!phone || typeof phone !== "string") {
      return validationError(
        res,
        "School phone number is required"
      );
    }

    if (phone.trim().length > 30) {
      return validationError(
        res,
        "Phone number cannot exceed 30 characters"
      );
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (!address || typeof address !== "string") {
      return validationError(
        res,
        "School address is required"
      );
    }

    if (address.trim().length > 300) {
      return validationError(
        res,
        "Address cannot exceed 300 characters"
      );
    }

    // =================================================
    // CITY
    // =================================================

    if (!city || typeof city !== "string") {
      return validationError(
        res,
        "City is required"
      );
    }

    if (city.trim().length > 100) {
      return validationError(
        res,
        "City cannot exceed 100 characters"
      );
    }

    // =================================================
    // STATE
    // =================================================

    if (state !== undefined && state !== "") {
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

    // =================================================
    // COUNTRY
    // =================================================

    if (!country || typeof country !== "string") {
      return validationError(
        res,
        "Country is required"
      );
    }

    if (country.trim().length > 100) {
      return validationError(
        res,
        "Country cannot exceed 100 characters"
      );
    }

    // =================================================
    // POSTAL CODE
    // =================================================

    if (postalCode !== undefined && postalCode !== "") {
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

    // =================================================
    // WEBSITE
    // =================================================

    if (website !== undefined && website !== "") {
      if (typeof website !== "string") {
        return validationError(
          res,
          "Website must be a string"
        );
      }

      try {
        new URL(website.trim());
      } catch {
        return validationError(
          res,
          "Please provide a valid website URL"
        );
      }
    }

    // =================================================
    // LOGO
    // =================================================

    if (logo !== undefined && logo !== "") {
      if (typeof logo !== "string") {
        return validationError(
          res,
          "Logo must be a string"
        );
      }
    }

    // =================================================
    // PRINCIPAL
    // =================================================

    if (principal !== undefined) {
      if (
        typeof principal !== "object" ||
        principal === null ||
        Array.isArray(principal)
      ) {
        return validationError(
          res,
          "Principal must be an object"
        );
      }

      if (
        principal.name !== undefined &&
        typeof principal.name !== "string"
      ) {
        return validationError(
          res,
          "Principal name must be a string"
        );
      }

      if (
        principal.email !== undefined &&
        principal.email !== ""
      ) {
        if (
          typeof principal.email !== "string" ||
          !isValidEmail(
            principal.email.toLowerCase().trim()
          )
        ) {
          return validationError(
            res,
            "Please provide a valid principal email"
          );
        }
      }

      if (
        principal.phone !== undefined &&
        typeof principal.phone !== "string"
      ) {
        return validationError(
          res,
          "Principal phone must be a string"
        );
      }
    }

    // =================================================
    // ESTABLISHED DATE
    // =================================================

    if (establishedDate !== undefined) {
      const date = new Date(establishedDate);

      if (Number.isNaN(date.getTime())) {
        return validationError(
          res,
          "Invalid established date"
        );
      }
    }

    // =================================================
    // SCHOOL TYPE
    // =================================================

    if (schoolType !== undefined) {
      const allowedSchoolTypes = [
        "public",
        "private",
        "international",
        "other",
      ];

      if (!allowedSchoolTypes.includes(schoolType)) {
        return validationError(
          res,
          "Invalid school type"
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
          "Invalid school status"
        );
      }
    }

    next();
  } catch (error) {
    console.error(
      "Create School Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "School validation failed",
    });
  }
};

// =====================================================
// UPDATE SCHOOL VALIDATION
// =====================================================

export const validateUpdateSchool = (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !isValidObjectId(id)) {
      return validationError(
        res,
        "Invalid school ID"
      );
    }

    const {
      name,
      code,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
      website,
      logo,
      principal,
      establishedDate,
      schoolType,
      status,
    } = req.body;

    // =================================================
    // NAME
    // =================================================

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return validationError(
          res,
          "School name cannot be empty"
        );
      }

      if (name.trim().length < 2) {
        return validationError(
          res,
          "School name must be at least 2 characters"
        );
      }

      if (name.trim().length > 100) {
        return validationError(
          res,
          "School name cannot exceed 100 characters"
        );
      }
    }

    // =================================================
    // CODE
    // =================================================

    if (code !== undefined) {
      if (
        typeof code !== "string" ||
        !code.trim()
      ) {
        return validationError(
          res,
          "School code cannot be empty"
        );
      }

      if (code.trim().length > 50) {
        return validationError(
          res,
          "School code cannot exceed 50 characters"
        );
      }
    }

    // =================================================
    // EMAIL
    // =================================================

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !email.trim()
      ) {
        return validationError(
          res,
          "School email cannot be empty"
        );
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      if (!isValidEmail(normalizedEmail)) {
        return validationError(
          res,
          "Please provide a valid school email"
        );
      }
    }

    // =================================================
    // PHONE
    // =================================================

    if (phone !== undefined) {
      if (typeof phone !== "string") {
        return validationError(
          res,
          "Phone number must be a string"
        );
      }

      if (phone.trim().length > 30) {
        return validationError(
          res,
          "Phone number cannot exceed 30 characters"
        );
      }
    }

    // =================================================
    // ADDRESS
    // =================================================

    if (address !== undefined) {
      if (typeof address !== "string") {
        return validationError(
          res,
          "Address must be a string"
        );
      }

      if (address.trim().length > 300) {
        return validationError(
          res,
          "Address cannot exceed 300 characters"
        );
      }
    }

    // =================================================
    // CITY
    // =================================================

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

    // =================================================
    // STATE
    // =================================================

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

    // =================================================
    // COUNTRY
    // =================================================

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

    // =================================================
    // POSTAL CODE
    // =================================================

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

    // =================================================
    // WEBSITE
    // =================================================

    if (website !== undefined) {
      if (website === "") {
        // Allow clearing website
      } else {
        if (typeof website !== "string") {
          return validationError(
            res,
            "Website must be a string"
          );
        }

        try {
          new URL(website.trim());
        } catch {
          return validationError(
            res,
            "Please provide a valid website URL"
          );
        }
      }
    }

    // =================================================
    // LOGO
    // =================================================

    if (logo !== undefined) {
      if (typeof logo !== "string") {
        return validationError(
          res,
          "Logo must be a string"
        );
      }
    }

    // =================================================
    // PRINCIPAL
    // =================================================

    if (principal !== undefined) {
      if (
        typeof principal !== "object" ||
        principal === null ||
        Array.isArray(principal)
      ) {
        return validationError(
          res,
          "Principal must be an object"
        );
      }

      if (
        principal.name !== undefined &&
        typeof principal.name !== "string"
      ) {
        return validationError(
          res,
          "Principal name must be a string"
        );
      }

      if (
        principal.email !== undefined &&
        principal.email !== ""
      ) {
        if (
          typeof principal.email !== "string" ||
          !isValidEmail(
            principal.email.toLowerCase().trim()
          )
        ) {
          return validationError(
            res,
            "Please provide a valid principal email"
          );
        }
      }

      if (
        principal.phone !== undefined &&
        typeof principal.phone !== "string"
      ) {
        return validationError(
          res,
          "Principal phone must be a string"
        );
      }
    }

    // =================================================
    // ESTABLISHED DATE
    // =================================================

    if (establishedDate !== undefined) {
      const date = new Date(establishedDate);

      if (Number.isNaN(date.getTime())) {
        return validationError(
          res,
          "Invalid established date"
        );
      }
    }

    // =================================================
    // SCHOOL TYPE
    // =================================================

    if (schoolType !== undefined) {
      const allowedSchoolTypes = [
        "public",
        "private",
        "international",
        "other",
      ];

      if (!allowedSchoolTypes.includes(schoolType)) {
        return validationError(
          res,
          "Invalid school type"
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
          "Invalid school status"
        );
      }
    }

    next();
  } catch (error) {
    console.error(
      "Update School Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "School validation failed",
    });
  }
};

// =====================================================
// SCHOOL ID VALIDATION
// =====================================================

export const validateSchoolId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid school ID",
      });
    }

    next();
  } catch (error) {
    console.error(
      "School ID Validation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "School ID validation failed",
    });
  }
};
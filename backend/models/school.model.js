import mongoose from "mongoose";

// =====================================================
// HELPER FUNCTIONS
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const validationError = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
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

    // -------------------------------------------------
    // Required Fields
    // -------------------------------------------------

    if (!name || typeof name !== "string") {
      return validationError(
        res,
        "School name is required"
      );
    }

    if (!code || typeof code !== "string") {
      return validationError(
        res,
        "School code is required"
      );
    }

    if (!email || typeof email !== "string") {
      return validationError(
        res,
        "School email is required"
      );
    }

    if (!phone || typeof phone !== "string") {
      return validationError(
        res,
        "School phone number is required"
      );
    }

    if (!address || typeof address !== "string") {
      return validationError(
        res,
        "School address is required"
      );
    }

    if (!city || typeof city !== "string") {
      return validationError(
        res,
        "City is required"
      );
    }

    if (!country || typeof country !== "string") {
      return validationError(
        res,
        "Country is required"
      );
    }

    // -------------------------------------------------
    // School Name
    // -------------------------------------------------

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

    // -------------------------------------------------
    // School Code
    // -------------------------------------------------

    const normalizedCode = code.trim();

    if (normalizedCode.length < 2) {
      return validationError(
        res,
        "School code must be at least 2 characters"
      );
    }

    if (normalizedCode.length > 50) {
      return validationError(
        res,
        "School code cannot exceed 50 characters"
      );
    }

    // -------------------------------------------------
    // Email
    // -------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return validationError(
        res,
        "Please provide a valid school email"
      );
    }

    // -------------------------------------------------
    // Phone
    // -------------------------------------------------

    if (phone.trim().length < 7) {
      return validationError(
        res,
        "Please provide a valid school phone number"
      );
    }

    // -------------------------------------------------
    // Address
    // -------------------------------------------------

    if (address.trim().length < 3) {
      return validationError(
        res,
        "School address must be at least 3 characters"
      );
    }

    // -------------------------------------------------
    // City
    // -------------------------------------------------

    if (city.trim().length < 2) {
      return validationError(
        res,
        "City must be at least 2 characters"
      );
    }

    // -------------------------------------------------
    // State
    // -------------------------------------------------

    if (state !== undefined && state !== null) {
      if (typeof state !== "string") {
        return validationError(
          res,
          "State must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Country
    // -------------------------------------------------

    if (country.trim().length < 2) {
      return validationError(
        res,
        "Country must be at least 2 characters"
      );
    }

    // -------------------------------------------------
    // Postal Code
    // -------------------------------------------------

    if (
      postalCode !== undefined &&
      postalCode !== null &&
      postalCode !== ""
    ) {
      if (typeof postalCode !== "string") {
        return validationError(
          res,
          "Postal code must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Website
    // -------------------------------------------------

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

    // -------------------------------------------------
    // Logo
    // -------------------------------------------------

    if (logo !== undefined && logo !== "") {
      if (typeof logo !== "string") {
        return validationError(
          res,
          "Logo must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Principal
    // -------------------------------------------------

    if (principal !== undefined && principal !== null) {
      if (
        typeof principal !== "object" ||
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
          !emailRegex.test(
            principal.email.trim()
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

    // -------------------------------------------------
    // Established Date
    // -------------------------------------------------

    if (
      establishedDate !== undefined &&
      establishedDate !== null &&
      establishedDate !== ""
    ) {
      const date = new Date(establishedDate);

      if (Number.isNaN(date.getTime())) {
        return validationError(
          res,
          "Please provide a valid established date"
        );
      }
    }

    // -------------------------------------------------
    // School Type
    // -------------------------------------------------

    const allowedSchoolTypes = [
      "public",
      "private",
      "international",
      "other",
    ];

    if (
      schoolType !== undefined &&
      !allowedSchoolTypes.includes(schoolType)
    ) {
      return validationError(
        res,
        "Invalid school type"
      );
    }

    // -------------------------------------------------
    // Status
    // -------------------------------------------------

    const allowedStatuses = [
      "active",
      "inactive",
    ];

    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return validationError(
        res,
        "Invalid school status"
      );
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

    // -------------------------------------------------
    // Validate School ID
    // -------------------------------------------------

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

    // -------------------------------------------------
    // Name
    // -------------------------------------------------

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

    // -------------------------------------------------
    // Code
    // -------------------------------------------------

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

      if (code.trim().length < 2) {
        return validationError(
          res,
          "School code must be at least 2 characters"
        );
      }

      if (code.trim().length > 50) {
        return validationError(
          res,
          "School code cannot exceed 50 characters"
        );
      }
    }

    // -------------------------------------------------
    // Email
    // -------------------------------------------------

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

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return validationError(
          res,
          "Please provide a valid school email"
        );
      }
    }

    // -------------------------------------------------
    // Phone
    // -------------------------------------------------

    if (phone !== undefined) {
      if (
        typeof phone !== "string" ||
        !phone.trim()
      ) {
        return validationError(
          res,
          "School phone number cannot be empty"
        );
      }

      if (phone.trim().length < 7) {
        return validationError(
          res,
          "Please provide a valid school phone number"
        );
      }
    }

    // -------------------------------------------------
    // Address
    // -------------------------------------------------

    if (address !== undefined) {
      if (
        typeof address !== "string" ||
        !address.trim()
      ) {
        return validationError(
          res,
          "School address cannot be empty"
        );
      }

      if (address.trim().length < 3) {
        return validationError(
          res,
          "School address must be at least 3 characters"
        );
      }
    }

    // -------------------------------------------------
    // City
    // -------------------------------------------------

    if (city !== undefined) {
      if (
        typeof city !== "string" ||
        !city.trim()
      ) {
        return validationError(
          res,
          "City cannot be empty"
        );
      }

      if (city.trim().length < 2) {
        return validationError(
          res,
          "City must be at least 2 characters"
        );
      }
    }

    // -------------------------------------------------
    // State
    // -------------------------------------------------

    if (state !== undefined) {
      if (typeof state !== "string") {
        return validationError(
          res,
          "State must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Country
    // -------------------------------------------------

    if (country !== undefined) {
      if (
        typeof country !== "string" ||
        !country.trim()
      ) {
        return validationError(
          res,
          "Country cannot be empty"
        );
      }

      if (country.trim().length < 2) {
        return validationError(
          res,
          "Country must be at least 2 characters"
        );
      }
    }

    // -------------------------------------------------
    // Postal Code
    // -------------------------------------------------

    if (postalCode !== undefined) {
      if (typeof postalCode !== "string") {
        return validationError(
          res,
          "Postal code must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Website
    // -------------------------------------------------

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

    // -------------------------------------------------
    // Logo
    // -------------------------------------------------

    if (logo !== undefined && logo !== "") {
      if (typeof logo !== "string") {
        return validationError(
          res,
          "Logo must be a string"
        );
      }
    }

    // -------------------------------------------------
    // Principal
    // -------------------------------------------------

    if (principal !== undefined && principal !== null) {
      if (
        typeof principal !== "object" ||
        Array.isArray(principal)
      ) {
        return validationError(
          res,
          "Principal must be an object"
        );
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          !emailRegex.test(
            principal.email.trim()
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

    // -------------------------------------------------
    // Established Date
    // -------------------------------------------------

    if (
      establishedDate !== undefined &&
      establishedDate !== null &&
      establishedDate !== ""
    ) {
      const date = new Date(establishedDate);

      if (Number.isNaN(date.getTime())) {
        return validationError(
          res,
          "Please provide a valid established date"
        );
      }
    }

    // -------------------------------------------------
    // School Type
    // -------------------------------------------------

    const allowedSchoolTypes = [
      "public",
      "private",
      "international",
      "other",
    ];

    if (
      schoolType !== undefined &&
      !allowedSchoolTypes.includes(schoolType)
    ) {
      return validationError(
        res,
        "Invalid school type"
      );
    }

    // -------------------------------------------------
    // Status
    // -------------------------------------------------

    const allowedStatuses = [
      "active",
      "inactive",
    ];

    if (
      status !== undefined &&
      !allowedStatuses.includes(status)
    ) {
      return validationError(
        res,
        "Invalid school status"
      );
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
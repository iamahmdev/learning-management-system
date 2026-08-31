import School from "../models/school.model.js";

// Create School
export const createSchool = async (req, res) => {
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

    // Check required fields
    if (
      !name ||
      !code ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, code, email, phone, address, city and country are required",
      });
    }

    // Normalize data
    const normalizedCode = code.toUpperCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing school code
    const existingCode = await School.findOne({
      code: normalizedCode,
    });

    if (existingCode) {
      return res.status(409).json({
        success: false,
        message: "School code already exists",
      });
    }

    // Check existing school email
    const existingEmail = await School.findOne({
      email: normalizedEmail,
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "School email already exists",
      });
    }

    // Create school
    const school = await School.create({
      name: name.trim(),
      code: normalizedCode,
      email: normalizedEmail,
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state,
      country: country.trim(),
      postalCode,
      website,
      logo,
      principal,
      establishedDate,
      schoolType,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "School created successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create school",
      error: error.message,
    });
  }
};

// Get All Schools
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch schools",
      error: error.message,
    });
  }
};

// Get Single School
export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;

    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School fetched successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch school",
      error: error.message,
    });
  }
};

// Update School
export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;

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

    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Check school code
    if (code) {
      const normalizedCode = code.toUpperCase().trim();

      const existingCode = await School.findOne({
        code: normalizedCode,
        _id: { $ne: id },
      });

      if (existingCode) {
        return res.status(409).json({
          success: false,
          message: "School code already exists",
        });
      }

      school.code = normalizedCode;
    }

    // Check school email
    if (email) {
      const normalizedEmail = email.toLowerCase().trim();

      const existingEmail = await School.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "School email already exists",
        });
      }

      school.email = normalizedEmail;
    }

    // Update fields
    if (name !== undefined) school.name = name.trim();
    if (phone !== undefined) school.phone = phone.trim();
    if (address !== undefined) school.address = address.trim();
    if (city !== undefined) school.city = city.trim();
    if (state !== undefined) school.state = state;
    if (country !== undefined) school.country = country.trim();
    if (postalCode !== undefined) school.postalCode = postalCode;
    if (website !== undefined) school.website = website;
    if (logo !== undefined) school.logo = logo;
    if (principal !== undefined) school.principal = principal;
    if (establishedDate !== undefined) {
      school.establishedDate = establishedDate;
    }
    if (schoolType !== undefined) school.schoolType = schoolType;
    if (status !== undefined) school.status = status;

    await school.save();

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update school",
      error: error.message,
    });
  }
};

// Delete School
export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;

    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    await School.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete school",
      error: error.message,
    });
  }
};
import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";

import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

// =====================================================
// COOKIE OPTIONS
// =====================================================

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Remove password and sensitive reset fields
const sanitizeUser = (user) => {
  const userData = user.toObject();

  delete userData.password;
  delete userData.resetPasswordToken;
  delete userData.resetPasswordExpires;

  return userData;
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      profile,
      status,
    } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();

    // Name validation
    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Prevent admin registration
    if (role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be registered",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "student",
      phone: phone || "",
      profile: profile || {},
      status: status || "active",
    });

    // Generate JWT
    const token = generateToken(user._id.toString(), user.role);

    // Store JWT
    res.cookie("token", token, getCookieOptions());

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Prevent admin from normal login
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Please use admin login",
      });
    }

    // Account status
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id.toString(), user.role);

    // Store JWT
    res.cookie("token", token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN LOGIN
// =====================================================

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Get admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL
      ?.toLowerCase()
      .trim();

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("Admin credentials are not configured");

      return res.status(500).json({
        success: false,
        message: "Admin authentication is not configured",
      });
    }

    // Check credentials
    if (
      normalizedEmail !== adminEmail ||
      password !== adminPassword
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Generate admin token
    const token = generateToken("admin", "admin");

    // Store JWT
    res.cookie("token", token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login admin",
      error: error.message,
    });
  }
};

// =====================================================
// GET CURRENT LOGGED-IN USER
// =====================================================

export const getCurrentUser = async (req, res) => {
  try {
    // Admin is handled separately
    if (req.user?.role === "admin" && req.user?.id === "admin") {
      return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: {
          id: "admin",
          email: process.env.ADMIN_EMAIL,
          role: "admin",
        },
      });
    }

    // JWT contains `id`, not `_id`
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication data",
      });
    }

    if (!isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Get user from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch current user",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL USERS
// =====================================================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// =====================================================
// GET USER BY ID
// =====================================================

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE USER
// =====================================================

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      profile,
      role,
      status,
      password,
    } = req.body;

    // Validate ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent assigning admin
    if (role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin role cannot be assigned",
      });
    }

    // Email validation
    if (email !== undefined) {
      if (!email.trim()) {
        return res.status(400).json({
          success: false,
          message: "Email cannot be empty",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use",
        });
      }

      user.email = normalizedEmail;
    }

    // Name
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      if (name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: "Name must be at least 2 characters",
        });
      }

      user.name = name.trim();
    }

    // Phone
    if (phone !== undefined) {
      user.phone = phone;
    }

    // Profile
    if (profile !== undefined) {
      user.profile = profile;
    }

    // Role
    if (role !== undefined) {
      user.role = role;
    }

    // Status
    if (status !== undefined) {
      user.status = status;
    }

    // Password
    if (password !== undefined) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE USER
// =====================================================

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// =====================================================
// LOGOUT USER
// =====================================================

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      ...getCookieOptions(),
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address",
      });
    }

    // Generate secure token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token before saving
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 15 minutes
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save({
      validateBeforeSave: false,
    });

    // Frontend reset URL
    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject:
        "Reset Your Password - School Management System",

      text: `
You requested to reset your password.

Click the following link to reset your password:

${resetUrl}

This password reset link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

School Management System
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Password Reset Request</h2>

          <p>Hello ${user.name || "User"},</p>

          <p>
            We received a request to reset your password
            for your School Management System account.
          </p>

          <p>
            Please click the button below to create a new password:
          </p>

          <p>
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            This password reset link will expire in
            <strong>15 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>
            For security reasons, do not share this link with anyone.
          </p>

          <p>
            Regards,<br />
            <strong>School Management System</strong>
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset link has been sent to your email address",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send password reset email",
    });
  }
};

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const {
      password,
      confirmPassword,
    } = req.body;

    // Token
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Password reset token is required",
      });
    }

    // Password fields
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirm password are required",
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long",
      });
    }

    // Hash received token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find valid user
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Password reset link is invalid or has expired",
      });
    }

    // Hash new password
    user.password = await bcrypt.hash(password, 10);

    // Clear reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password has been reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};


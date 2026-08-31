import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ----------------------------------------------------
// Authentication Middleware
// ----------------------------------------------------

export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;

    // Check token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is not configured");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    // Make sure token contains user ID
    if (!decoded?._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    // Find authenticated user
    const user = await User.findById(decoded._id).select(
      "-password"
    );

    // Check user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account no longer exists",
      });
    }

    // Store authenticated user
    req.user = user;

    // Continue request
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again",
    });
  }
};
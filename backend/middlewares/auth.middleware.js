import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ----------------------------------------------------
// Authentication Middleware
// ----------------------------------------------------

export const isAuthenticated = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "").trim()
      : null;
    const token = cookieToken || tokenFromHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first",
      });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is not configured");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded?._id ?? decoded?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    if (userId === "admin" || decoded?.role === "admin") {
      req.user = {
        _id: userId,
        id: userId,
        role: "admin",
        email: process.env.ADMIN_EMAIL || "admin@school.com",
      };

      return next();
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account no longer exists",
      });
    }

    req.user = {
      ...user.toObject(),
      _id: user._id,
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again",
    });
  }
};
// Role-Based Authorization Middleware

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // User must be authenticated first
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required. Please login first",
        });
      }

      // Check user role
      if (!req.user.role) {
        return res.status(403).json({
          success: false,
          message: "User role is not available",
        });
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
      }

      // Permission granted
      next();
    } catch (error) {
      console.error("Role Authorization Error:", error);

      return res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };
};
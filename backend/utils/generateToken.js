import jwt from "jsonwebtoken";

const generateToken = (userId, role = "user") => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not configured"
    );
  }

  const resolvedUserId =
    typeof userId === "object" && userId !== null
      ? userId.id || userId._id || "unknown"
      : userId;

  const resolvedRole =
    typeof userId === "object" && userId !== null
      ? userId.role || role
      : role;

  return jwt.sign(
    {
      _id: resolvedUserId,
      id: resolvedUserId,
      role: resolvedRole,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;
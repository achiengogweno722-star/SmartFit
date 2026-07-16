import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// Authenticate User
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    console.log("JWT Secret Exists:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("========== JWT ERROR ==========");
    console.log("Name:", error.name);
    console.log("Message:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Authorize Roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }

    next();
  };
};
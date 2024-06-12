import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

interface DecodedToken {
  _id: string;
  role: "user" | "admin";
}

declare module "express-serve-static-core" {
  interface Request {
    _id?: string;
    role?: "user" | "admin";
  }
}

// Middleware to verify JWT token and user role
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Unauthorized: Missing token",
      data: "",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_secret as string
    ) as DecodedToken;
    req._id = decodedToken._id;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Unauthorized: Invalid token",
      data: "",
    });
  }
};

// Middleware to check if user is admin
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: "Forbidden: Access denied. Only admins are allowed",
      data: "",
    });
  }
  next();
};

export { authMiddleware, isAdminMiddleware };
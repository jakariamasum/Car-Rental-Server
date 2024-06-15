import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

interface DecodedToken {
  id: string;
  role: "user" | "admin";
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    _id?: string;
    role?: "user" | "admin";
    email?: string;
  }
}

// Middleware to verify JWT token and user role
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("Missing token");
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_secret as string
    ) as DecodedToken;
    req._id = decodedToken.id;
    req.role = decodedToken.role;
    req.email = decodedToken.email;
    next();
  } catch (error) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  }
};

// Middleware to check if user is admin
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  }
  next();
};
// Middleware to check if user is admin
const isUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "user") {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  }
  next();
};

export { authMiddleware, isAdminMiddleware, isUserMiddleware };

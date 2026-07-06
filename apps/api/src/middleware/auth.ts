import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/jwt.js";
import { createError } from "./errorHandler.js";
import type { JwtPayload } from "@bookbiteflow/shared-types";

// Extend Express Request to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware: verifies the JWT access token from the Authorization header.
 * Attaches decoded payload to req.user.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(401, "Authentication required. Please log in.");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      next(error);
    } else {
      next(createError(401, "Invalid or expired token. Please log in again."));
    }
  }
}

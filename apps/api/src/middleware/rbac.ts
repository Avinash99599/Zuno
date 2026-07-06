import type { Request, Response, NextFunction } from "express";
import { createError } from "./errorHandler.js";
import type { UserRole } from "@bookbiteflow/shared-types";

/**
 * Middleware factory: checks if the authenticated user's role
 * is in the allowed roles list.
 */
export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(createError(401, "Authentication required."));
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      return next(
        createError(
          403,
          "You do not have permission to access this resource."
        )
      );
    }

    next();
  };
}

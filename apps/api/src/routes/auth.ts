import { Router } from "express";
import { z } from "zod";
import { loginUser, refreshAccessToken, logoutUser, getUserById } from "../services/auth.js";
import { authenticate } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { createError } from "../middleware/errorHandler.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// ─── Validation Schemas ───
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// ─── POST /api/auth/login ───
router.post(
  "/login",
  authLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        throw createError(400, "Validation failed", parsed.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })));
      }

      const { email, password } = parsed.data;
      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const result = await loginUser(email, password, ipAddress, userAgent);

      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);

// ─── POST /api/auth/refresh ───
router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = refreshSchema.safeParse(req.body);
      if (!parsed.success) {
        throw createError(400, "Refresh token is required.");
      }

      const result = await refreshAccessToken(parsed.data.refreshToken);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
);

// ─── POST /api/auth/logout ───
router.post(
  "/logout",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (refreshToken && req.user) {
        await logoutUser(refreshToken, req.user.userId);
      }
      res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
      next(error);
    }
  }
);

// ─── GET /api/auth/me ───
router.get(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw createError(401, "Not authenticated.");
      }

      const user = await getUserById(req.user.userId);
      if (!user) {
        throw createError(404, "User not found.");
      }

      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

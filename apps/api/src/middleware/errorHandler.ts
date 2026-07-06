import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export interface AppError extends Error {
  statusCode?: number;
  errors?: { field: string; message: string }[];
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[${statusCode}] ${message}`, { stack: err.stack });

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors,
    statusCode,
  });
}

export function createError(
  statusCode: number,
  message: string,
  errors?: { field: string; message: string }[]
): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

import dotenv from "dotenv";
dotenv.config();

export const env = {
  // Server
  PORT: parseInt(process.env.PORT || "3001", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "dev-jwt-secret-change-me",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "dev-jwt-refresh-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // External APIs — MOCK: replace when real API contract is confirmed
  CUSTOMER_API_BASE_URL:
    process.env.CUSTOMER_API_BASE_URL || "http://localhost:3001/api/mock",
  RESTAURANT_API_BASE_URL:
    process.env.RESTAURANT_API_BASE_URL || "http://localhost:3001/api/mock",

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
} as const;

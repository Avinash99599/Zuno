import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { initializeSocket } from "./socket/index.js";

// ─── Routes ───
import authRoutes from "./routes/auth.js";
import restaurantRoutes from "./routes/restaurants.js";
import customerRoutes from "./routes/customers.js";
import orderRoutes from "./routes/orders.js";
import menuItemRoutes from "./routes/menuItems.js";
import dashboardRoutes from "./routes/dashboard.js";
import mockRestaurantRoutes from "./routes/mock/restaurants.js";
import mockOrderRoutes from "./routes/mock/orders.js";
import mockCustomerRoutes from "./routes/mock/customers.js";
import mockAnalyticsRoutes from "./routes/mock/analytics.js";

const app = express();
const httpServer = createServer(app);

// ─── Socket.io ───
const socketEmitters = initializeSocket(httpServer, env.CORS_ORIGIN);

// Make socket emitters available to routes via app.locals
app.locals.socket = socketEmitters;

// ─── Global Middleware ───
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLimiter);

// ─── Health Check ───
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Zuno API is running",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// ─── Auth Routes ───
app.use("/api/auth", authRoutes);

// ─── Real Database API Routes ───
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ─── Mock External API Routes ───
// MOCK — replace when real API contract is confirmed
app.use("/api/mock/restaurants", mockRestaurantRoutes);
app.use("/api/mock/orders", mockOrderRoutes);
app.use("/api/mock/customers", mockCustomerRoutes);
app.use("/api/mock/analytics", mockAnalyticsRoutes);

// ─── 404 Handler ───
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    statusCode: 404,
  });
});

// ─── Global Error Handler ───
app.use(errorHandler);

// ─── Start Server ───
httpServer.listen(env.PORT, () => {
  logger.info(`
  ╔══════════════════════════════════════════════╗
  ║   🍽️  Zuno API Server                ║
  ║   🌐 http://localhost:${env.PORT}                 ║
  ║   🔧 Environment: ${env.NODE_ENV.padEnd(21)}  ║
  ║   🔌 Socket.io: ready                        ║
  ╚══════════════════════════════════════════════╝
  `);
});

export default app;

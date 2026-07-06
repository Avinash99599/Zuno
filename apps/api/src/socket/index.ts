import { Server as SocketServer } from "socket.io";
import type { Server as HttpServer } from "http";
import { logger } from "../utils/logger.js";

export function initializeSocket(httpServer: HttpServer, corsOrigin: string) {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    logger.info(`🔌 Socket connected: ${socket.id}`);

    // Join admin room
    socket.on("join:admin", () => {
      socket.join("admin");
      logger.debug(`Socket ${socket.id} joined admin room`);
    });

    // Join restaurant-specific room
    socket.on("join:restaurant", (restaurantId: string) => {
      socket.join(`restaurant:${restaurantId}`);
      logger.debug(`Socket ${socket.id} joined restaurant:${restaurantId}`);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`🔌 Socket disconnected: ${socket.id} — ${reason}`);
    });
  });

  // ─── Emit helpers (used by routes/services) ───
  return {
    io,
    emitOrderUpdate: (orderId: string, data: unknown) => {
      io.to("admin").emit("order:updated", { orderId, ...data as object });
    },
    emitNewOrder: (data: unknown) => {
      io.to("admin").emit("order:new", data);
    },
    emitNotification: (data: unknown) => {
      io.to("admin").emit("notification:new", data);
    },
    emitRevenueUpdate: (data: unknown) => {
      io.to("admin").emit("revenue:update", data);
    },
    emitRestaurantUpdate: (restaurantId: string, data: unknown) => {
      io.to("admin").emit("restaurant:updated", { restaurantId, ...data as object });
    },
  };
}

export type SocketEmitters = ReturnType<typeof initializeSocket>;

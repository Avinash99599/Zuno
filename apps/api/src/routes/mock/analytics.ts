// MOCK — replace when real API contract is confirmed

import { Router } from "express";
import {
  mockDashboardStats,
  mockRevenueChart,
  mockOrderChart,
  mockActivityTimeline,
  mockHeatmapData,
  mockTopRestaurants,
  mockTopMenuItems,
} from "../../mock/data.js";
import type { Request, Response } from "express";

const router = Router();

// ─── GET /api/mock/analytics/dashboard ───
router.get("/dashboard", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockDashboardStats });
});

// ─── GET /api/mock/analytics/revenue ───
router.get("/revenue", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockRevenueChart });
});

// ─── GET /api/mock/analytics/orders ───
router.get("/orders", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockOrderChart });
});

// ─── GET /api/mock/analytics/activity ───
router.get("/activity", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockActivityTimeline });
});

// ─── GET /api/mock/analytics/heatmap ───
router.get("/heatmap", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockHeatmapData });
});

// ─── GET /api/mock/analytics/top-restaurants ───
router.get("/top-restaurants", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockTopRestaurants });
});

// ─── GET /api/mock/analytics/top-items ───
router.get("/top-items", (_req: Request, res: Response) => {
  res.json({ success: true, data: mockTopMenuItems });
});

export default router;

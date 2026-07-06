// MOCK — replace when real API contract is confirmed
// These routes simulate the external Restaurant Website API

import { Router } from "express";
import { mockRestaurants, mockRestaurantListItems } from "../../mock/data.js";
import type { Request, Response } from "express";

const router = Router();

// ─── GET /api/mock/restaurants ───
router.get("/", (_req: Request, res: Response) => {
  const page = parseInt(_req.query.page as string) || 1;
  const pageSize = parseInt(_req.query.pageSize as string) || 10;
  const status = _req.query.status as string;
  const search = (_req.query.search as string || "").toLowerCase();

  let filtered = [...mockRestaurantListItems];

  if (status) {
    filtered = filtered.filter((r) => r.status === status);
  }

  if (search) {
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(search) ||
        r.ownerName.toLowerCase().includes(search) ||
        r.location.city.toLowerCase().includes(search)
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  res.json({
    success: true,
    data,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasMore: page < totalPages,
    },
  });
});

// ─── GET /api/mock/restaurants/:id ───
router.get("/:id", (req: Request, res: Response) => {
  const restaurant = mockRestaurants.find((r) => r.id === req.params.id);

  if (!restaurant) {
    res.status(404).json({ success: false, message: "Restaurant not found.", statusCode: 404 });
    return;
  }

  res.json({ success: true, data: restaurant });
});

// ─── PATCH /api/mock/restaurants/:id/status ───
router.patch("/:id/status", (req: Request, res: Response) => {
  const restaurant = mockRestaurants.find((r) => r.id === req.params.id);

  if (!restaurant) {
    res.status(404).json({ success: false, message: "Restaurant not found.", statusCode: 404 });
    return;
  }

  const { status } = req.body;
  restaurant.status = status;
  restaurant.updatedAt = new Date().toISOString();

  res.json({ success: true, data: restaurant, message: `Restaurant ${status.toLowerCase()} successfully.` });
});

export default router;

// MOCK — replace when real API contract is confirmed

import { Router } from "express";
import { mockOrders } from "../../mock/data.js";
import type { Request, Response } from "express";

const router = Router();

// ─── GET /api/mock/orders ───
router.get("/", (_req: Request, res: Response) => {
  const page = parseInt(_req.query.page as string) || 1;
  const pageSize = parseInt(_req.query.pageSize as string) || 10;
  const status = _req.query.status as string;
  const search = (_req.query.search as string || "").toLowerCase();

  let filtered = [...mockOrders];

  if (status) {
    filtered = filtered.filter((o) => o.status === status);
  }

  if (search) {
    filtered = filtered.filter(
      (o) =>
        o.restaurantName.toLowerCase().includes(search) ||
        o.customerName.toLowerCase().includes(search) ||
        o.id.toLowerCase().includes(search)
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  res.json({
    success: true,
    data,
    pagination: { page, pageSize, totalItems, totalPages, hasMore: page < totalPages },
  });
});

// ─── GET /api/mock/orders/:id ───
router.get("/:id", (req: Request, res: Response) => {
  const order = mockOrders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: "Order not found.", statusCode: 404 });
    return;
  }
  res.json({ success: true, data: order });
});

// ─── PATCH /api/mock/orders/:id/status ───
router.patch("/:id/status", (req: Request, res: Response) => {
  const order = mockOrders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: "Order not found.", statusCode: 404 });
    return;
  }
  order.status = req.body.status;
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, data: order, message: `Order status updated to ${req.body.status}.` });
});

export default router;

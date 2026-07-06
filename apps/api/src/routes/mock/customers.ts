// MOCK — replace when real API contract is confirmed

import { Router } from "express";
import { mockCustomerListItems, mockCustomers } from "../../mock/data.js";
import type { Request, Response } from "express";

const router = Router();

// ─── GET /api/mock/customers ───
router.get("/", (_req: Request, res: Response) => {
  const page = parseInt(_req.query.page as string) || 1;
  const pageSize = parseInt(_req.query.pageSize as string) || 10;
  const search = (_req.query.search as string || "").toLowerCase();

  let filtered = [...mockCustomerListItems];

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.phone.includes(search)
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

// ─── GET /api/mock/customers/:id ───
router.get("/:id", (req: Request, res: Response) => {
  const customer = mockCustomers.find((c) => c.id === req.params.id);
  if (!customer) {
    res.status(404).json({ success: false, message: "Customer not found.", statusCode: 404 });
    return;
  }
  res.json({ success: true, data: customer });
});

export default router;

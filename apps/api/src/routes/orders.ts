import { Router } from "express";
import { prisma } from "../services/db.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// GET /api/orders
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.orders.findMany({
      include: {
        customers: {
          select: {
            name: true,
          },
        },
        restaurants: {
          select: {
            name: true,
          },
        },
        order_items: {
          include: {
            menu_items: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
    res.json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.orders.findUnique({
      where: { id: req.params.id as string },
      include: {
        customers: {
          select: {
            name: true,
          },
        },
        restaurants: {
          select: {
            name: true,
          },
        },
        order_items: {
          include: {
            menu_items: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!item) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/orders/:id/status
router.patch("/:id/status", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const updated = await prisma.orders.update({
      where: { id: req.params.id as string },
      data: {
        status,
      },
      include: {
        customers: { select: { name: true } },
        restaurants: { select: { name: true } },
      },
    });
    
    // Add entry to status log
    await prisma.order_status_log.create({
      data: {
        order_id: req.params.id as string,
        status,
      },
    });

    res.json({ success: true, data: updated, message: `Order status updated to ${status.toLowerCase()}` });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/orders/:id/payment
router.patch("/:id/payment", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payment_status } = req.body;
    const updated = await prisma.orders.update({
      where: { id: req.params.id as string },
      data: {
        payment_status,
      },
      include: {
        customers: { select: { name: true } },
        restaurants: { select: { name: true } },
      },
    });
    res.json({ success: true, data: updated, message: `Payment status updated to ${payment_status.toLowerCase()}` });
  } catch (error) {
    next(error);
  }
});

export default router;

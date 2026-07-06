import { Router } from "express";
import { prisma } from "../services/db.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// GET /api/dashboard
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [restaurantsCount, customersCount, ordersCount, completedOrders] = await Promise.all([
      prisma.restaurants.count(),
      prisma.customers.count(),
      prisma.orders.count(),
      prisma.orders.findMany({
        where: { status: "completed" },
        select: { total_amount: true },
      }),
    ]);

    // Calculate total revenue
    const totalRevenue = completedOrders.reduce((s, o) => s + Number(o.total_amount), 0);

    // Get orders by status
    const pendingOrdersCount = await prisma.orders.count({ where: { status: "pending_payment" } });
    const preparingOrdersCount = await prisma.orders.count({ where: { status: "preparing" } });
    const readyOrdersCount = await prisma.orders.count({ where: { status: "ready" } });
    const activeRestCount = await prisma.restaurants.count({ where: { is_open: true } });

    res.json({
      success: true,
      data: {
        stats: {
          restaurants: {
            total: restaurantsCount,
            active: activeRestCount,
            inactive: restaurantsCount - activeRestCount,
          },
          customers: {
            total: customersCount,
          },
          orders: {
            total: ordersCount,
            pending: pendingOrdersCount,
            preparing: preparingOrdersCount,
            ready: readyOrdersCount,
          },
          revenue: {
            total: totalRevenue,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

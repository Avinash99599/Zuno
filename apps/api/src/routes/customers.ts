import { Router } from "express";
import { prisma } from "../services/db.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// GET /api/customers
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.customers.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
});

// GET /api/customers/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.customers.findUnique({
      where: { id: req.params.id as string },
      include: {
        orders: {
          include: {
            order_items: {
              include: {
                menu_items: true,
              },
            },
          },
        },
      },
    });
    if (!item) {
      res.status(404).json({ success: false, message: "Customer not found" });
      return;
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// POST /api/customers
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone } = req.body;
    
    // In PostgreSQL / Supabase, we need a UUID for id. Let's let Prisma generate it or use a default if it uses dbgenerated.
    // In our schema: id String @id @db.Uuid. It doesn't have default(dbgenerated("gen_random_uuid()")) for customers!
    // Wait, let's look at schema.prisma:
    // model customers {
    //   id         String    @id @db.Uuid
    // Wait! In `customers`, there is NO default generator! That means we MUST generate a UUID when creating a customer.
    // We can use a standard crypto.randomUUID()!
    const crypto = await import("crypto");
    const id = crypto.randomUUID();
    
    const newItem = await prisma.customers.create({
      data: {
        id,
        name,
        email,
        phone,
      },
    });
    res.json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/customers/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.customers.delete({
      where: { id: req.params.id as string },
    });
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

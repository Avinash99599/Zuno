import { Router } from "express";
import { prisma } from "../services/db.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// GET /api/menu-items
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.menu_items.findMany({
      include: {
        restaurants: {
          select: {
            name: true,
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

// POST /api/menu-items
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurant_id, name, category, price, description, photo_url, is_veg, is_available } = req.body;
    
    // Find first restaurant if not provided or valid
    let targetRestaurantId = restaurant_id;
    if (!targetRestaurantId) {
      const firstRest = await prisma.restaurants.findFirst();
      if (!firstRest) {
        res.status(400).json({ success: false, message: "No restaurants exist in the database to assign this menu item." });
        return;
      }
      targetRestaurantId = firstRest.id;
    }

    const newItem = await prisma.menu_items.create({
      data: {
        restaurant_id: targetRestaurantId,
        name,
        category,
        price,
        description,
        photo_url,
        is_veg: is_veg !== undefined ? is_veg : true,
        is_available: is_available !== undefined ? is_available : true,
      },
      include: {
        restaurants: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
});

// PUT /api/menu-items/:id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, price, description, photo_url, is_veg, is_available } = req.body;
    const updated = await prisma.menu_items.update({
      where: { id: req.params.id as string },
      data: {
        name,
        category,
        price,
        description,
        photo_url,
        is_veg,
        is_available,
      },
      include: {
        restaurants: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/menu-items/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.menu_items.delete({
      where: { id: req.params.id as string },
    });
    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

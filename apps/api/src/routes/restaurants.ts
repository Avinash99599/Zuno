import { Router } from "express";
import { prisma } from "../services/db.js";
import type { Request, Response, NextFunction } from "express";

const router = Router();

// GET /api/restaurants
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await prisma.restaurants.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
});

// GET /api/restaurants/:id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await prisma.restaurants.findUnique({
      where: { id: req.params.id as string },
    });
    if (!item) {
      res.status(404).json({ success: false, message: "Restaurant not found" });
      return;
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// POST /api/restaurants
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, cuisine_tags, address, photo_url, avg_prep_time_minutes } = req.body;
    const newItem = await prisma.restaurants.create({
      data: {
        name,
        cuisine_tags: cuisine_tags || [],
        address,
        photo_url,
        avg_prep_time_minutes: avg_prep_time_minutes || 20,
        rating: 4.0,
        is_open: true,
      },
    });
    res.json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
});

// PUT /api/restaurants/:id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, cuisine_tags, address, photo_url, is_open } = req.body;
    const updated = await prisma.restaurants.update({
      where: { id: req.params.id as string },
      data: {
        name,
        cuisine_tags,
        address,
        photo_url,
        is_open,
      },
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/restaurants/:id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.restaurants.delete({
      where: { id: req.params.id as string },
    });
    res.json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

import express, { Request, Response } from "express";

import { redisClient } from "../utils";
import { prisma } from "..";
import { cache } from "../middleware/cache";

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

const router = express.Router();

router.get("/", cache, async (req: Request, res: Response) => {
  const { category, location, name, minPrice, maxPrice } = req.query;
  const whereConditions: {
    [key: string]:
      | string
      | ParsedQs
      | string[]
      | ParsedQs[]
      | { [key: string]: number | string };
  } = {};

  if (name) {
    whereConditions.name = {
      contains: name,
    };
  }

  if (category) {
    whereConditions.category = category;
  }

  if (location) {
    whereConditions.location = location;
  }

  if (minPrice) {
    whereConditions.price = { gte: +minPrice };
  }

  if (maxPrice) {
    whereConditions.price = {
      lte: +maxPrice,
      ...((whereConditions.price as {}) || {}),
    };
  }

  try {
    const products = await prisma.products.findMany({ where: whereConditions });
    await redisClient.set(req.url, JSON.stringify(products));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server unavailable!" });
  }
});

router.get("/:id", cache, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(id),
      },
    });
    await redisClient.set(`/products/${id}`, JSON.stringify(product));
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server unavailable!" });
  }
});

export default router;

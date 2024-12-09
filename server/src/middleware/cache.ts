import { NextFunction, Request, Response } from "express";

import { redisClient } from "../utils";

export const cache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.url;

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }
    next();
  } catch (error) {
    next();
  }
};

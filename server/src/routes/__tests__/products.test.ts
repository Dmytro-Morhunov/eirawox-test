import request from "supertest";
import express from "express";

import router from "../products";
import { prisma } from "../..";
import { redisClient } from "../..//utils";

jest.mock("../..", () => ({
  prisma: { products: { findMany: jest.fn(), findUnique: jest.fn() } },
}));
jest.mock("../../utils", () => ({
  redisClient: { set: jest.fn(), get: jest.fn() },
}));

const app = express();
app.use(express.json());
app.use("/products", router);

describe("GET /products", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return products with filtering", async () => {
    const mockProducts = [{ id: 1, name: "Product 1", price: 100 }];
    (prisma.products.findMany as jest.Mock).mockResolvedValue(mockProducts);
    const response = await request(app)
      .get("/products")
      .query({ minPrice: 50, maxPrice: 150 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
    expect(prisma.products.findMany).toHaveBeenCalledWith({
      where: { price: { gte: 50, lte: 150 } },
    });
    expect(redisClient.set).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(mockProducts)
    );
  });

  test("should return 500 on error", async () => {
    (prisma.products.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );
    const response = await request(app).get("/products");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Server unavailable!" });
  });
});

describe("GET /products/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a product by id", async () => {
    const mockProduct = { id: 1, name: "Product 1", price: 100 };
    (prisma.products.findUnique as jest.Mock).mockResolvedValue(mockProduct);
    const response = await request(app).get("/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
    expect(prisma.products.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(redisClient.set).toHaveBeenCalledWith(
      "/products/1",
      JSON.stringify(mockProduct)
    );
  });

  test("should return 500 on error", async () => {
    (prisma.products.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );
    const response = await request(app).get("/products/1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Server unavailable!" });
  });
});

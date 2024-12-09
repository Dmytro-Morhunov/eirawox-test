import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import productsRouter from "./routes/products";

const port = 8080;
const app: Express = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(
  express.static("./public", {
    maxAge: "1d",
    setHeaders: function (res) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);
app.use(express.json({ inflate: true }));
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { prisma };

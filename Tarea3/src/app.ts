import cors from "cors";
import express from "express";
import { ListInventory } from "./application/use-cases/ListInventory.js";
import { RegisterProduct } from "./application/use-cases/RegisterProduct.js";
import { RegisterRestock } from "./application/use-cases/RegisterRestock.js";
import { RegisterSale } from "./application/use-cases/RegisterSale.js";
import { UuidGenerator } from "./infrastructure/id/UuidGenerator.js";
import { InMemoryProductRepository } from "./infrastructure/repositories/InMemoryProductRepository.js";
import { InMemoryRestockRepository } from "./infrastructure/repositories/InMemoryRestockRepository.js";
import { InMemorySaleRepository } from "./infrastructure/repositories/InMemorySaleRepository.js";
import { ProductController } from "./presentation/controllers/ProductController.js";
import { RestockController } from "./presentation/controllers/RestockController.js";
import { SaleController } from "./presentation/controllers/SaleController.js";
import { errorHandler, notFoundHandler } from "./presentation/middleware/errorHandler.js";

export function createApp() {
  const products = new InMemoryProductRepository();
  const sales = new InMemorySaleRepository();
  const restocks = new InMemoryRestockRepository();
  const ids = new UuidGenerator();

  const productController = new ProductController(
    new RegisterProduct(products, ids),
    new ListInventory(products),
  );
  const saleController = new SaleController(new RegisterSale(products, sales, ids));
  const restockController = new RestockController(new RegisterRestock(products, restocks, ids));

  const app = express();
  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json({ limit: "100kb" }));

  app.get("/salud", (_request, response) => response.json({ estado: "ok" }));
  app.post("/api/productos", productController.create);
  app.get("/api/productos", productController.list);
  app.get("/api/inventario", productController.list);
  app.post("/api/ventas", saleController.create);
  app.post("/api/reabastecimientos", restockController.create);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

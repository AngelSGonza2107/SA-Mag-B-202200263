import type { Product } from "../entities/Product.js";

export interface StockChange {
  productoId: string;
  existencias: number;
}

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  updateStocks(changes: StockChange[]): Promise<void>;
}

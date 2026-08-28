import type { Product } from "../../domain/entities/Product.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";

export class ListInventory {
  constructor(private readonly products: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.products.findAll();
  }
}

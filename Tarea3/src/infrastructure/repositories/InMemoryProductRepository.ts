import type { Product } from "../../domain/entities/Product.js";
import { NotFoundError } from "../../domain/errors/DomainError.js";
import type { IProductRepository, StockChange } from "../../domain/repositories/IProductRepository.js";

export class InMemoryProductRepository implements IProductRepository {
  private readonly products = new Map<string, Product>();

  async save(product: Product): Promise<void> {
    this.products.set(product.id, product);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) =>
      a.descripcion.localeCompare(b.descripcion, "es"),
    );
  }

  async updateStocks(changes: StockChange[]): Promise<void> {
    // Primero se verifican todos los cambios; así la operación es atómica en memoria.
    const updated = changes.map((change) => {
      const product = this.products.get(change.productoId);
      if (!product) {
        throw new NotFoundError(`No se encontró el producto ${change.productoId}`);
      }
      return product.changeStock(change.existencias);
    });
    updated.forEach((product) => this.products.set(product.id, product));
  }
}

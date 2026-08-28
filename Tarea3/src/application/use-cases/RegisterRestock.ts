import type { Restock } from "../../domain/entities/Restock.js";
import { NotFoundError } from "../../domain/errors/DomainError.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { IRestockRepository } from "../../domain/repositories/IRestockRepository.js";
import type { InventoryItemInput } from "../dto/InventoryItemInput.js";
import type { IIdGenerator } from "../ports/IIdGenerator.js";

export class RegisterRestock {
  constructor(
    private readonly products: IProductRepository,
    private readonly restocks: IRestockRepository,
    private readonly ids: IIdGenerator,
  ) {}

  async execute(items: InventoryItemInput[]): Promise<Restock> {
    const productList = await Promise.all(items.map((item) => this.products.findById(item.productoId)));
    const missingIds = items.filter((_, index) => productList[index] === null).map((item) => item.productoId);
    if (missingIds.length > 0) {
      throw new NotFoundError(`No se encontraron los productos: ${missingIds.join(", ")}`);
    }

    const restock: Restock = {
      id: this.ids.generate(),
      items: items.map((item, index) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        existenciasAnteriores: productList[index]!.existencias,
        existenciasNuevas: productList[index]!.existencias + item.cantidad,
      })),
      fecha: new Date().toISOString(),
    };
    await this.products.updateStocks(restock.items.map((item) => ({
      productoId: item.productoId,
      existencias: item.existenciasNuevas,
    })));
    await this.restocks.save(restock);
    return restock;
  }
}

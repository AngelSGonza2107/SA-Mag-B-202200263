import type { Sale } from "../../domain/entities/Sale.js";
import { ConflictError, NotFoundError } from "../../domain/errors/DomainError.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { ISaleRepository } from "../../domain/repositories/ISaleRepository.js";
import type { InventoryItemInput } from "../dto/InventoryItemInput.js";
import type { IIdGenerator } from "../ports/IIdGenerator.js";

export class RegisterSale {
  constructor(
    private readonly products: IProductRepository,
    private readonly sales: ISaleRepository,
    private readonly ids: IIdGenerator,
  ) {}

  async execute(items: InventoryItemInput[]): Promise<Sale> {
    const productList = await Promise.all(items.map((item) => this.products.findById(item.productoId)));
    const missingIds = items.filter((_, index) => productList[index] === null).map((item) => item.productoId);
    if (missingIds.length > 0) {
      throw new NotFoundError(`No se encontraron los productos: ${missingIds.join(", ")}`);
    }

    const insufficient = items.flatMap((item, index) => {
      const product = productList[index]!;
      return product.existencias < item.cantidad
        ? [{ productoId: product.id, solicitadas: item.cantidad, disponibles: product.existencias }]
        : [];
    });
    if (insufficient.length > 0) {
      throw new ConflictError("Existencias insuficientes para completar la venta", insufficient);
    }

    const saleItems = items.map((item, index) => {
      const product = productList[index]!;
      return {
        productoId: product.id,
        descripcion: product.descripcion,
        cantidad: item.cantidad,
        precioUnitario: product.precio,
        subtotal: Math.round(product.precio * item.cantidad * 100) / 100,
      };
    });
    const sale: Sale = {
      id: this.ids.generate(),
      items: saleItems,
      total: Math.round(saleItems.reduce((sum, item) => sum + item.subtotal, 0) * 100) / 100,
      fecha: new Date().toISOString(),
    };

    await this.products.updateStocks(items.map((item, index) => ({
      productoId: item.productoId,
      existencias: productList[index]!.existencias - item.cantidad,
    })));
    await this.sales.save(sale);
    return sale;
  }
}

import { Product } from "../../domain/entities/Product.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { IIdGenerator } from "../ports/IIdGenerator.js";

export interface RegisterProductInput {
  descripcion: string;
  precio: number;
  existenciasIniciales?: number;
}

export class RegisterProduct {
  constructor(
    private readonly products: IProductRepository,
    private readonly ids: IIdGenerator,
  ) {}

  async execute(input: RegisterProductInput): Promise<Product> {
    const product = Product.create(
      this.ids.generate(),
      input.descripcion,
      input.precio,
      input.existenciasIniciales ?? 0,
    );
    await this.products.save(product);
    return product;
  }
}

import type { Request, Response } from "express";
import type { ListInventory } from "../../application/use-cases/ListInventory.js";
import type { RegisterProduct, RegisterProductInput } from "../../application/use-cases/RegisterProduct.js";
import { ValidationError } from "../../domain/errors/DomainError.js";

function parseProduct(body: unknown): RegisterProductInput {
  if (typeof body !== "object" || body === null) {
    throw new ValidationError("El cuerpo de la petición debe ser un objeto JSON");
  }
  const value = body as Record<string, unknown>;
  if (typeof value.descripcion !== "string") {
    throw new ValidationError("descripcion es requerida y debe ser texto");
  }
  if (typeof value.precio !== "number") {
    throw new ValidationError("precio es requerido y debe ser numérico");
  }
  if (value.existenciasIniciales !== undefined && typeof value.existenciasIniciales !== "number") {
    throw new ValidationError("existenciasIniciales debe ser numérico");
  }
  return {
    descripcion: value.descripcion,
    precio: value.precio,
    ...(value.existenciasIniciales !== undefined
      ? { existenciasIniciales: value.existenciasIniciales }
      : {}),
  };
}

export class ProductController {
  constructor(
    private readonly registerProduct: RegisterProduct,
    private readonly listInventory: ListInventory,
  ) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const product = await this.registerProduct.execute(parseProduct(request.body));
    response.status(201).json({ data: product });
  };

  list = async (_request: Request, response: Response): Promise<void> => {
    const products = await this.listInventory.execute();
    response.json({
      data: products,
      resumen: {
        totalProductos: products.length,
        unidadesEnInventario: products.reduce((sum, product) => sum + product.existencias, 0),
      },
    });
  };
}

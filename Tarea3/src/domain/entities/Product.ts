import { ValidationError } from "../errors/DomainError.js";

export interface ProductData {
  id: string;
  descripcion: string;
  precio: number;
  existencias: number;
  creadoEn: Date;
  actualizadoEn: Date;
}

export class Product {
  private constructor(private readonly data: ProductData) {}

  static create(id: string, descripcion: string, precio: number, existencias: number): Product {
    const cleanDescription = descripcion.trim();
    if (cleanDescription.length < 2 || cleanDescription.length > 200) {
      throw new ValidationError("La descripción debe contener entre 2 y 200 caracteres");
    }
    if (!Number.isFinite(precio) || precio <= 0 || Number(precio.toFixed(2)) !== precio) {
      throw new ValidationError("El precio debe ser mayor que cero y tener como máximo 2 decimales");
    }
    if (!Number.isInteger(existencias) || existencias < 0) {
      throw new ValidationError("Las existencias iniciales deben ser un entero mayor o igual que cero");
    }

    const now = new Date();
    return new Product({
      id,
      descripcion: cleanDescription,
      precio,
      existencias,
      creadoEn: now,
      actualizadoEn: now,
    });
  }

  static restore(data: ProductData): Product {
    return new Product({ ...data });
  }

  get id(): string { return this.data.id; }
  get descripcion(): string { return this.data.descripcion; }
  get precio(): number { return this.data.precio; }
  get existencias(): number { return this.data.existencias; }
  get disponible(): boolean { return this.data.existencias > 0; }

  changeStock(newStock: number): Product {
    if (!Number.isInteger(newStock) || newStock < 0) {
      throw new ValidationError("Las existencias no pueden ser negativas");
    }
    return Product.restore({ ...this.data, existencias: newStock, actualizadoEn: new Date() });
  }

  toJSON() {
    return {
      ...this.data,
      disponible: this.disponible,
      creadoEn: this.data.creadoEn.toISOString(),
      actualizadoEn: this.data.actualizadoEn.toISOString(),
    };
  }
}

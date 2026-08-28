import { ValidationError } from "../../domain/errors/DomainError.js";

export interface InventoryItemInput {
  productoId: string;
  cantidad: number;
}

export function normalizeItems(value: unknown): InventoryItemInput[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ValidationError("items debe ser un arreglo con al menos un producto");
  }

  const grouped = new Map<string, number>();
  value.forEach((rawItem, index) => {
    if (typeof rawItem !== "object" || rawItem === null) {
      throw new ValidationError(`El elemento items[${index}] no es válido`);
    }
    const item = rawItem as Record<string, unknown>;
    if (typeof item.productoId !== "string" || item.productoId.trim() === "") {
      throw new ValidationError(`items[${index}].productoId es requerido`);
    }
    if (!Number.isInteger(item.cantidad) || (item.cantidad as number) <= 0) {
      throw new ValidationError(`items[${index}].cantidad debe ser un entero mayor que cero`);
    }
    const id = item.productoId.trim();
    grouped.set(id, (grouped.get(id) ?? 0) + (item.cantidad as number));
  });

  return Array.from(grouped, ([productoId, cantidad]) => ({ productoId, cantidad }));
}

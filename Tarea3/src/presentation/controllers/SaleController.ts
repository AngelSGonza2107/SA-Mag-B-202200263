import type { Request, Response } from "express";
import { normalizeItems } from "../../application/dto/InventoryItemInput.js";
import type { RegisterSale } from "../../application/use-cases/RegisterSale.js";

export class SaleController {
  constructor(private readonly registerSale: RegisterSale) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as Record<string, unknown> | null;
    const sale = await this.registerSale.execute(normalizeItems(body?.items));
    response.status(201).json({ data: sale });
  };
}

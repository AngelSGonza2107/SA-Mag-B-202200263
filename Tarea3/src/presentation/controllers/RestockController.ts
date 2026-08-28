import type { Request, Response } from "express";
import { normalizeItems } from "../../application/dto/InventoryItemInput.js";
import type { RegisterRestock } from "../../application/use-cases/RegisterRestock.js";

export class RestockController {
  constructor(private readonly registerRestock: RegisterRestock) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as Record<string, unknown> | null;
    const restock = await this.registerRestock.execute(normalizeItems(body?.items));
    response.status(201).json({ data: restock });
  };
}

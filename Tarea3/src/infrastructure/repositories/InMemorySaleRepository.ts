import type { Sale } from "../../domain/entities/Sale.js";
import type { ISaleRepository } from "../../domain/repositories/ISaleRepository.js";

export class InMemorySaleRepository implements ISaleRepository {
  private readonly sales: Sale[] = [];

  async save(sale: Sale): Promise<void> {
    this.sales.push(sale);
  }
}

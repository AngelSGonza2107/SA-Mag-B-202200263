import type { Sale } from "../entities/Sale.js";

export interface ISaleRepository {
  save(sale: Sale): Promise<void>;
}

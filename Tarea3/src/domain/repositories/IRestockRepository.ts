import type { Restock } from "../entities/Restock.js";

export interface IRestockRepository {
  save(restock: Restock): Promise<void>;
}

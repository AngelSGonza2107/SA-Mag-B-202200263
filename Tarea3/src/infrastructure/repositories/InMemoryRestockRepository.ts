import type { Restock } from "../../domain/entities/Restock.js";
import type { IRestockRepository } from "../../domain/repositories/IRestockRepository.js";

export class InMemoryRestockRepository implements IRestockRepository {
  private readonly restocks: Restock[] = [];

  async save(restock: Restock): Promise<void> {
    this.restocks.push(restock);
  }
}

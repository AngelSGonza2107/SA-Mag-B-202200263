import assert from "node:assert/strict";
import test from "node:test";
import { RegisterProduct } from "../src/application/use-cases/RegisterProduct.js";
import { RegisterRestock } from "../src/application/use-cases/RegisterRestock.js";
import { RegisterSale } from "../src/application/use-cases/RegisterSale.js";
import type { IIdGenerator } from "../src/application/ports/IIdGenerator.js";
import { ConflictError } from "../src/domain/errors/DomainError.js";
import { InMemoryProductRepository } from "../src/infrastructure/repositories/InMemoryProductRepository.js";
import { InMemoryRestockRepository } from "../src/infrastructure/repositories/InMemoryRestockRepository.js";
import { InMemorySaleRepository } from "../src/infrastructure/repositories/InMemorySaleRepository.js";

class SequentialIdGenerator implements IIdGenerator {
  private next = 0;
  generate(): string { return `id-${++this.next}`; }
}

test("registra una venta y descuenta las existencias", async () => {
  const products = new InMemoryProductRepository();
  const ids = new SequentialIdGenerator();
  const product = await new RegisterProduct(products, ids).execute({
    descripcion: "Teclado mecánico",
    precio: 250.50,
    existenciasIniciales: 10,
  });

  const sale = await new RegisterSale(products, new InMemorySaleRepository(), ids)
    .execute([{ productoId: product.id, cantidad: 2 }]);

  assert.equal(sale.total, 501);
  assert.equal((await products.findById(product.id))?.existencias, 8);
});

test("rechaza una venta completa cuando no hay existencias suficientes", async () => {
  const products = new InMemoryProductRepository();
  const ids = new SequentialIdGenerator();
  const product = await new RegisterProduct(products, ids).execute({
    descripcion: "Mouse",
    precio: 100,
    existenciasIniciales: 1,
  });

  await assert.rejects(
    new RegisterSale(products, new InMemorySaleRepository(), ids)
      .execute([{ productoId: product.id, cantidad: 2 }]),
    ConflictError,
  );
  assert.equal((await products.findById(product.id))?.existencias, 1);
});

test("reabastece varios productos en una sola operación", async () => {
  const products = new InMemoryProductRepository();
  const ids = new SequentialIdGenerator();
  const register = new RegisterProduct(products, ids);
  const first = await register.execute({ descripcion: "Monitor", precio: 900 });
  const second = await register.execute({ descripcion: "Cable HDMI", precio: 45, existenciasIniciales: 2 });

  await new RegisterRestock(products, new InMemoryRestockRepository(), ids).execute([
    { productoId: first.id, cantidad: 5 },
    { productoId: second.id, cantidad: 3 },
  ]);

  assert.equal((await products.findById(first.id))?.existencias, 5);
  assert.equal((await products.findById(second.id))?.existencias, 5);
});

import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../../src/app";
import { TestDataSource } from '../../src/config/data-source-test';

describe("E2E Order Flow", () => {
  it("creates product, restocks, places order", async () => {
    const app = await createApp(TestDataSource);

    const product = await request(app)
      .post("/products")
      .send({
        "name": "Sample Shoes 2",
        "description": "Comfortable running shoes",
        "price": "79.99",
        "category": "Footwear"
      })
      .expect(201);

    await request(app)
      .post(`/products/${product.body.id}/restock`)
      .send({ quantity: 10 })
      .expect(200);

    const order = await request(app)
      .post("/orders")
      .send({
        items: [{ productId: product.body.id, quantity: 2 }],
      })
      .expect(201);

    await request(app)
      .post(`/products/${product.body.id}/sell`)
      .send({ quantity: 9 })
      .expect(409);
  });
});

import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../../src/app";
import { TestDataSource } from '../../src/config/data-source-test';

describe("POST /products/:id/sell", () => {
  it("should return 409 when stock is insufficient", async () => {
    const app = await createApp(TestDataSource);

    await request(app)
      .post(`/products`)
      .send({
        "name": "Sample Shoes",
        "description": "Comfortable running shoes",
        "price": "79.99",
        "category": "Footwear"
      })
      .expect(201)
      .then(async (productResponse) => {
        const productId = productResponse.body.id;

        await request(app)
          .post(`/products/${productId}/restock`)
          .send({ quantity: 5 })
          .expect(200);

        await request(app)
          .post(`/products/${productId}/sell`)
          .send({ quantity: 10 })
          .expect(409)
          .then((sellResponse) => {
            expect(sellResponse.body).toHaveProperty("message");
            expect(sellResponse.body.message).toBe("Insufficient stock");
          })
      });
  });
});

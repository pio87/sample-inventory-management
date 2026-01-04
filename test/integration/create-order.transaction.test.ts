import { describe, it, expect } from "vitest";
import { v4 } from "uuid";
import { TestDataSource } from "../../src/config/data-source-test";
import { CreateOrderHandler } from "../../src/modules/order/application/handlers/create-order.handler";
import { PricingServiceImpl } from "../../src/modules/pricing/infrastructure/pricing-service.impl";
import { InventoryEntity } from "../../src/modules/inventory/infrastructure/persistence/schemas/inventory-entity";

describe("CreateOrder transaction", () => {
  it("should rollback inventory when order fails", async () => {
    // seed inventory
    const repo = TestDataSource.getRepository(InventoryEntity);
    const productId = v4();
    const customerId = v4();
    await repo.save({
      id: v4(),
      productId: productId,
      quantity: 1,
    });

    const handler = new CreateOrderHandler(
      TestDataSource,
      new PricingServiceImpl()
    );

    await expect(
      handler.execute({
        customerId,
        items: [{ productId: productId, quantity: 2 }],
      } as any)
    ).rejects.toThrow();

    const inventory = await repo.findOneBy({ productId });
    expect(inventory?.quantity).toBe(1); // rollback
  });
});

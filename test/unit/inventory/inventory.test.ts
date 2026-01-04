import { describe, it, expect } from "vitest";
import { InventoryItem } from "../../../src/modules/inventory/domain/entities/inventory-item";
import { ProductId } from "../../../src/modules/inventory/domain/value-objects/product-id";
import { Quantity } from "../../../src/modules/inventory/domain/value-objects/quantity";

describe("InventoryItem", () => {
  it("should not allow stock below zero", () => {
    const item = InventoryItem.create(
      ProductId.create("p1"),
      Quantity.create(5)
    );

    expect(() =>
      item.sell(Quantity.create(10))
    ).toThrow();
  });

  it("should increase stock on restock", () => {
    const item = InventoryItem.create(
      ProductId.create("p1"),
      Quantity.create(5)
    );

    item.restock(Quantity.create(3));

    expect(item.getQuantity()).toBe(8);
  });
});

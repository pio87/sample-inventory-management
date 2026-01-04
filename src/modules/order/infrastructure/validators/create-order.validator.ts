import { body } from "express-validator";

export const createOrderValidator = [
  body("customerId").isUUID(),
  body("items").isArray({ min: 1 }),
  body("items.*.productId").isUUID(),
  body("items.*.quantity").isInt({ gt: 0 }),
];

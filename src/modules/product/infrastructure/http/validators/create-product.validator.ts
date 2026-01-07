import { body } from "express-validator";

export const createProductValidator = [
  body("name").isString().isLength({ min: 1, max: 50 }),
  body("description").isString().isLength({ min: 1, max: 50 }),
  body("price").isFloat({ gt: 0 }),
  body("category").isString(),
];

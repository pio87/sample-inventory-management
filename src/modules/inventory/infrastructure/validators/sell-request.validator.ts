import { body, ValidationChain } from 'express-validator';

export const sellRequestValidator = [
  body('productId')
    .isUUID()
    .withMessage('productId must be a valid UUID'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('quantity must be a positive integer'),
]

# Inventory Management API

## Overview

This project is a simplified inventory and order management API.  
The application exposes endpoints for product management, stock control, and order creation, including pricing logic with discount policies.

The system was designed with a **Domain-Driven Design (DDD)** approach in mind, focusing on clear separation between domain logic, application use cases, and infrastructure concerns.

---

## Notes / Assumptions

### 1. Assumptions & Simplifications

**Assumptions made during implementation:**
- The system manages a **single warehouse**; inventory is tracked per product, not per location.
- Orders are created synchronously and are assumed to be small enough to fit into a single transaction.
- Pricing and discounts are calculated at order creation time and are not recalculated later.

**Intentionally omitted elements:**
- Authentication and authorization.
- Customer persistence and full customer lifecycle.
- Payment processing, external integrations.

These elements were omitted to keep the scope aligned with the task requirements.

---

### 2. Technical Decisions

#### Database choice
**PostgreSQL** was selected as the primary database.

Rationale:
- Strong transactional guarantees (required for inventory consistency).
- Mature ecosystem and solid TypeORM support.
- Good fit for relational data such as orders, order items, and inventory.

#### Project structure
The codebase is structured by **domains/modules**, not by technical layers.
  
Each module contains:
- domain – entities, value objects, and domain rules
- application – commands, queries, and handlers
- infrastructure – persistence schemas, repositories, and HTTP adapters

#### CQRS implementation

A lightweight CQRS approach was used.
Commands modify state (e.g. CreateOrderCommand)
Queries read state (e.g. GetProductsQuery)

### 2. Business Logic

#### Discount system

Discounts are implemented using a Strategy + Policy pattern in the pricing module.
Each discount type (e.g. volume-based, seasonal, location-based) is represented as an independent policy.

Example priority order:
1. Location-based pricing strategy
2. Global promotional discounts (e.g. Black Friday)
3. Volume-based discounts

#### Stock consistency

Stock operations (sell, restock) are encapsulated within the InventoryItem domain entity.
The entity enforces a rule that stock can never go below zero.

Order creation is executed inside a database transaction, ensuring that
inventory changes are rolled back on failure and no partial state updates occur.

Key edge cases handled:
- Concurrent order creation attempts for the same product.
- Selling more items than are in stock.
- Rolling back stock changes on order creation failure.

### 4. Testing

Unit tests cover:
- Inventory domain rules (e.g. preventing negative stock, restocking behavior).
- Core domain invariants (e.g. order total calculation, discount application).

Integration tests cover:
- End-to-end order creation flow, including stock adjustments.
- API endpoint correctness and error handling.


#### What is not covered (but expected in production)
- Load testing and performance optimization.
- Comprehensive validation and error handling for all edge cases.
- Full test coverage for all modules and edge cases.
- Database migration compatibility tests.
- High-concurrency stress testing.

### Trade-offs & Alternatives

#### Design decision I would change with more time


#### Alternative solution considered and rejected

Alternative considered:
Using database-level constraints or triggers to enforce inventory consistency.

Why it was rejected:
- Business rules become harder to test and reason about.
- Logic is hidden at the database level instead of being explicit in the domain.
- Reduced flexibility for future changes.

Domain-level validation combined with transactional application logic has been chosen.

#### Why the chosen solution was selected (and its downsides)

Reasons for selection:
- Clear separation of concerns aligned with DDD principles.
- Flexibility to evolve business rules in the domain layer.
- Easier to test and maintain business logic.

Downsides:
- Slightly more complex application layer due to explicit transaction management. 
- Requires discipline to maintain clear boundaries between layers.

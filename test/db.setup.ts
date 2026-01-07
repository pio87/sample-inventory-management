import "@swc-node/register";
import { beforeAll, beforeEach, afterAll } from "vitest";
import { TestDataSource } from "../src/config/data-source-test";

beforeAll(async () => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
  }
});

beforeEach(async () => {
  await TestDataSource.synchronize(true);
});

afterAll(async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
});

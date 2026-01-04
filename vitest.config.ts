import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/**/*.test.ts"],
          setupFiles: ["./test/env.setup.ts"],
        },
      },
      {
        test: {
          name: "integration",
          include: ["test/integration/**/*.test.ts"],
          setupFiles: [
            "./test/env.setup.ts",
            "./test/db.setup.ts",
          ],
          maxWorkers: 1
        },
      },
    ],
  },
});

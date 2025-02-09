export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    setupFilesAfterEnv: ["./src/test/setup.ts"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  };
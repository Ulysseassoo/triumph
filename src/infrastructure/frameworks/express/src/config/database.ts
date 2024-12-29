import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";

const isTestEnvironment = process.env.ENVIRONMENT === "test";

export const AppDataSource = isTestEnvironment
  ? new DataSource({
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: true,
      entities: [join(__dirname, "../../../infrastructure/database/entities/*.ts")],
      migrations: [join(__dirname, "../migrations/*.{ts,js}")],
    })
  : new DataSource({
      type: "postgres",
      host: process.env.DB_HOST || "postgres",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "postgres",
      synchronize: process.env.NODE_ENV !== "production",
      logging: process.env.NODE_ENV === "development",
      entities: [join(__dirname, "../../../infrastructure/database/entities/*.ts")],
      migrations: [join(__dirname, "../migrations/*.{ts,js}")],
    });



export const initializeDatabases = async () => {
  try {
    console.log("Initializing databases...");
    await AppDataSource.initialize();
    console.log("AppDataSource initialized successfully!");
  } catch (error) {
    console.error("Error initializing databases:", error);
    throw new Error("Database connection error");
  }
};

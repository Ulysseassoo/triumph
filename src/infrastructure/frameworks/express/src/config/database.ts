import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";

const isTestEnvironment = process.env.ENVIRONMENT === "test";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../../../../database/entities/*.orm-entity.ts')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  subscribers: [],
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

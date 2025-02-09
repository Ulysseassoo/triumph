import { DataSource } from "typeorm";
import { AppDataSource } from "../infrastructure/orm/typeorm/data-source";

let testDataSource: DataSource;

beforeAll(async () => {
  testDataSource = await AppDataSource().initialize();
});

afterAll(async () => {
  await testDataSource.destroy();
});

export const getTestDb = (): DataSource => testDataSource;
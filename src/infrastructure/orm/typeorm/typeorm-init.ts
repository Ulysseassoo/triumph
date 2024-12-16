import { AppDataSource,MongoDataSource } from "./data-source";

export const initializeDatabase = async () => {
  try {
    if(!AppDataSource().isInitialized) {
      await AppDataSource().initialize();
      console.log("Database initialized successfully");
      // await MongoDataSource().initialize();
    }
    return AppDataSource();
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  }
};
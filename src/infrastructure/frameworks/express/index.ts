
import dotenv from "dotenv";
import { initializeDatabases } from "./src/config/database";
import app from "./src/app";
dotenv.config();


const PORT = process.env.PORT || 3000;


initializeDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
});

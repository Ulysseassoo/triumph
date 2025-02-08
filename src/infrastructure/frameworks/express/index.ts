import dotenv from "dotenv";
import app from "./src/app";
import { initializeDatabase } from "../../../infrastructure/orm/typeorm/typeorm-init";
dotenv.config();

const PORT = process.env.PORT || 5001;

initializeDatabase().then(async () => {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
});

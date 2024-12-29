
import dotenv from "dotenv";
import { initializeDatabase } from "../../orm/typeorm/typeorm-init";
import app from "./src/app";
dotenv.config();


const PORT = process.env.PORT || 3000;


initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
});

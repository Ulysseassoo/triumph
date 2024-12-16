import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
import {initializeDatabase} from '@infrastructure/orm/typeorm/typeorm-init';

dotenv.config();

const PORT = process.env.PORTEXPRESS || 5001;

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Serveur running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
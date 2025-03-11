import dotenv from "dotenv";
import { initializePostgres } from "./postgres.js";
import { initializeMongo } from "./mongo.js";

dotenv.config();

// Determine which database to use
const DATABASE_TYPE = process.env.DATABASE_TYPE || "postgres";

let sequelizeInstance = null;

export const initializeDatabase = async () => {
  if (!sequelizeInstance) {
    if (DATABASE_TYPE === "postgres") {
      sequelizeInstance = await initializePostgres();
    } else if (DATABASE_TYPE === "mongo") {
      sequelizeInstance = await initializeMongo();
    } else {
      console.error(
        '❌ Invalid DATABASE_TYPE specified in .env. Choose "postgres" or "mongo".'
      );
      process.exit(1);
    }
  }
  return sequelizeInstance;
};

export const getSequelize = () => {
  if (!sequelizeInstance) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return sequelizeInstance;
};

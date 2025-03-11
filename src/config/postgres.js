import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL Configuration
const dbConfig = {
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

// Function to initialize PostgreSQL
export const initializePostgres = async () => {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL is required
        rejectUnauthorized: false, // Ignore self-signed certificate issues
      },
    },
  });
  

  try {
    await sequelize.authenticate();
    console.log(`✅ PostgreSQL database connected successfully.`);
  } catch (error) {
    console.error(`❌ PostgreSQL connection error:`, error);
    process.exit(1);
  }

  return sequelize;
};

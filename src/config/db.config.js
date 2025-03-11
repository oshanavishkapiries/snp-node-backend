// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// // Load environment variables for database configuration
// const dbConfig = {
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 5432,
//   dialect: 'postgres',
//   logging: process.env.NODE_ENV === 'development' ? console.log : false,
// };

// // Initialize Sequelize instance
// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//   host: dbConfig.host,
//   port: dbConfig.port,
//   dialect: dbConfig.dialect,
//   logging: dbConfig.logging,
//   pool: {
//     max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

// // Test the database connection
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(`✅ Database connection established successfully.`);
//   } catch (error) {
//     console.error(`❌ Unable to connect to the database:`, error);
//   }
// })();

// export default sequelize;


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables for PostgreSQL configuration
const dbConfig = {
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true, // Force SSL
      rejectUnauthorized: false, // Bypass certificate verification (use for development only)
    },
  },
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connection established successfully.`);
  } catch (error) {
    console.error(`❌ Unable to connect to the database:`, error);
  }
})();

export default sequelize;
require('dotenv').config();
const { Pool } = require('pg');

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

// Configure the database connection
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // ✅ Always enable SSL for production
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      ssl: isProduction ? { rejectUnauthorized: false } : false, // ✅ Ensure SSL when needed
    };

// Create a new PostgreSQL connection pool
const pool = new Pool(poolConfig);

// Test the database connection
pool.connect()
  .then(client => {
    console.log('✅ Successfully connected to PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database Connection Error:', err.message);
    console.error('📌 Stack Trace:', err.stack);
  });

module.exports = pool;

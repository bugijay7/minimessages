// Load environment variables at the start
require('dotenv').config();

const { Pool } = require('pg');

// Determine the connection configuration
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const poolConfig = {
  connectionString: connectionString || {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  },
  ssl: isProduction ? { rejectUnauthorized: false } : false,
};

// Create a new pool instance
const pool = new Pool(poolConfig);

// Test the database connection
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release();
  })
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;

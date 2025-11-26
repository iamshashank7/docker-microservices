const express = require('express');
const { Pool } = require('pg');

const app = express();

// Postgres connection using env variables
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'user_service',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'users_db',
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'up' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'down' });
  }
});

app.get('/users', async (req, res) => {
  const data = await pool.query('SELECT id, name, email FROM users');
  res.json(data.rows);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`user-service running on port ${PORT}`);
});

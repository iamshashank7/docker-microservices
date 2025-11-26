const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "order-service" });
});

// Create order
app.post("/orders", async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    const result = await pool.query(
      "INSERT INTO orders (user_id, amount) VALUES ($1, $2) RETURNING *",
      [user_id, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// List orders
app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`order-service running on port ${PORT}`);
});

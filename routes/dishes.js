const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Configure the PostgreSQL connection using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Endpoint to get all dishes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Dishes');
        res.json(result.rows); // Return the dishes as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dishes' });
    }
});

module.exports = router;


const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// Configure the PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// API endpoint to fetch all orders
router.get('/orders', async (req, res) => {
    try {
        const query = `
            SELECT
                Orders.UniqueID AS order_id,
                Orders.Status AS status,
                Orders.Pickup_time AS pickup_time,
                Orders.Created_at AS created_at,
                Client.Name AS client_name,
                Client.Phone_Number AS client_phone
            FROM
                Orders
            JOIN
                Client ON Orders.Client_id = Client.UniqueID
            ORDER BY
                Orders.Created_at DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows); // Return the orders as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;


const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// API endpoint to fetch all orders (returns JSON)
// router.get('/orders', async (req, res) => {
//     try {
//         const query = `
//             SELECT
//                 Orders.UniqueID AS order_id,
//                 Orders.Pickup_time AS pickup_time,
//                 Orders.Created_at AS created_at,
//                 Client.Name AS client_name,
//                 Client.Phone_Number AS client_phone
//             FROM
//                 Orders
//             JOIN
//                 Client ON Orders.Client_id = Client.UniqueID
//             ORDER BY
//                 Orders.Created_at DESC;
//         `;
//         const result = await pool.query(query);
//         res.json(result.rows); // Return the orders as JSON
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// });

// Route to render the Admin Dashboard (HTML)
router.get('/dashboard', async (req, res) => {
  try {
    const query = `
    SELECT
        Orders.UniqueID AS order_id,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'menu_item_name', Dishes.Name,
                'quantity', Ordered_dishes.Quantity,
                'price', Dishes.Price,
                'total_price', (Ordered_dishes.Quantity * Dishes.Price)
            )
        ) AS dishes,
        SUM(Ordered_dishes.Quantity * Dishes.Price) AS total_price,
        Orders.Status AS status
    FROM
        Orders
    LEFT JOIN
        Ordered_dishes ON Orders.UniqueID = Ordered_dishes.Order_id
    LEFT JOIN
        Dishes ON Ordered_dishes.Dish_id = Dishes.UniqueID
    GROUP BY
        Orders.UniqueID
    ORDER BY
        Orders.Created_at DESC;
`;
      const result = await pool.query(query);
      const orders = result.rows;

      console.log(orders); // Log the data being sent to the template
      res.render('admin_dashboard', { orders });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching orders.');
  }
});

// Route to handle Accept/Decline actions for orders
router.post('/orders/:orderId/:action', async (req, res) => {
  const { orderId, action } = req.params;
  const validActions = ['accept', 'decline', 'send-sms'];

  // Ensure the action is valid
  if (!validActions.includes(action.toLowerCase())) {
    return res.status(400).send('Invalid action');
  }

  try {
    if (action === 'send-sms') {
      // Fetch the order details (optional, for logging or future use)
      const query = `
        SELECT
          Orders.UniqueID AS order_id,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'menu_item_name', Dishes.Name,
              'quantity', Ordered_dishes.Quantity,
              'price', Dishes.Price,
              'total_price', (Ordered_dishes.Quantity * Dishes.Price)
            )
          ) AS dishes,
          SUM(Ordered_dishes.Quantity * Dishes.Price) AS total_price,
          Orders.Status AS status,
          Orders.sms_sent
        FROM
          Orders
        LEFT JOIN
          Ordered_dishes ON Orders.UniqueID = Ordered_dishes.Order_id
        LEFT JOIN
          Dishes ON Ordered_dishes.Dish_id = Dishes.UniqueID
        WHERE
          Orders.UniqueID = $1
        GROUP BY
          Orders.UniqueID;
      `;

      const result = await pool.query(query, [orderId]);
      const order = result.rows[0]; // Get the first (and only) result

      if (!order) {
        return res.status(404).send('Order not found.');
      }

      if (order.sms_sent) {
        console.log(`SMS already sent for order ID: ${orderId}`);
      } else {
        console.log(`Simulating SMS for order ID: ${orderId}`);
        console.log(JSON.stringify(order, null, 2)); // Pretty print the order details

        // Update the `sms_sent` column to TRUE
        await pool.query('UPDATE Orders SET sms_sent = TRUE WHERE UniqueID = $1', [orderId]);
      }

      res.redirect('/admin/dashboard'); // Redirect back to the dashboard
    } else {
      // Map the action to the appropriate status
      const status = action === 'accept' ? 'Accepted' : 'Declined';

      // Update the order's status
      await pool.query('UPDATE Orders SET Status = $1 WHERE UniqueID = $2', [status, orderId]);
      res.redirect('/admin/dashboard'); // Redirect back to the dashboard
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing action.');
  }
});



module.exports = router;

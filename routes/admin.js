const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const twilio = require('twilio');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Configure Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const formatOrderDetailsForSMS = (order) => {
    const itemsDescription = order.dishes
        .map(item => {
            const menuItemName = item.menu_item_name || 'Unknown Item'; // Default item name
            const quantity = item.quantity || 0; // Default quantity
            const price = item.price || 0; // Default price
            const totalPrice = (quantity * price).toFixed(2); // Calculate total price

            return `${quantity}x ${menuItemName} ($${price.toFixed(2)}) = $${totalPrice}`;
        })
        .join(', ');

    const totalOrderPrice = (Number(order.total_price) || 0).toFixed(2);

    //const totalOrderPrice = order.total_price ? order.total_price.toFixed(2) : '0.00'; // Default total price

    return `Order ID: ${order.order_id}\nItems: ${itemsDescription}\nTotal: $${totalOrderPrice}`;
};

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
              Orders.Status AS status,
              Client.Phone_Number AS phone,
              Orders.Created_at
          FROM
              Orders
          LEFT JOIN
              Ordered_dishes ON Orders.UniqueID = Ordered_dishes.Order_id
          LEFT JOIN
              Dishes ON Ordered_dishes.Dish_id = Dishes.UniqueID
          LEFT JOIN
              Client ON Orders.Client_id = Client.UniqueID
          GROUP BY
              Orders.UniqueID, Client.Phone_Number, Orders.Created_at
          ORDER BY
              Orders.Created_at DESC;
        `;
        const result = await pool.query(query);
        const orders = result.rows;

        res.render('admin_dashboard', { orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders.');
    }
});

// Route to fetch Admin Dashboard data (JSON)
router.get('/admin/dashboard', async (req, res) => {
    try {
        const query = `
        SELECT
            o.uniqueid AS order_id,
            COALESCE(SUM(d.price * od.quantity), 0) AS total_price,
            o.phone_number,
            o.status,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'name', COALESCE(d.name, 'Unknown Dish'),
                    'quantity', COALESCE(od.quantity, 0)
                )
            ) AS dishes
        FROM orders o
        LEFT JOIN ordered_dishes od ON o.uniqueid = od.order_id
        LEFT JOIN dishes d ON od.dish_id = d.uniqueid
        GROUP BY o.uniqueid, o.phone_number, o.status
        HAVING COALESCE(SUM(d.price * od.quantity), 0) > 0;
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).send('Error fetching admin dashboard data');
    }
});

// Route to handle Accept/Decline actions for orders
router.post('/orders/:orderId/:action', async (req, res) => {
  const { orderId, action } = req.params;
  const validActions = ['accept', 'decline', 'send-sms'];

  // Validate action
  if (!validActions.includes(action.toLowerCase())) {
      return res.status(400).send('Invalid action');
  }

  try {
      if (action === 'send-sms') {
          // Query to fetch order details
          const query = `
              SELECT
                  Orders.UniqueID AS order_id,
                  JSON_AGG(
                      JSON_BUILD_OBJECT(
                          'menu_item_name', Dishes.Name,
                          'quantity', Ordered_dishes.Quantity,
                          'price', Dishes.Price
                      )
                  ) AS dishes,
                  SUM(Ordered_dishes.Quantity * Dishes.Price) AS total_price,
                  Orders.Phone_Number AS phone,
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
          const order = result.rows[0];
          console.log(order)

          if (!order) {
              return res.status(404).send('Order not found.');
          }

          if (order.sms_sent) {
              return res.status(400).send('SMS already sent for this order.');
          }

          const phone = order.phone; // Replace with a default testing number

          console.log('phone:', phone);

         // Validate phone number
        if (!phone || typeof phone !== 'string' || !phone.trim().startsWith('+')) {
            console.error(`Invalid phone number for Order ID ${orderId}:`, order.phone);
            return res.status(400).send(`Cannot send SMS: Missing or invalid phone number for Order ID: ${orderId}`);
        }


          // Format SMS message
          const message = formatOrderDetailsForSMS(order);

          try {
              // Send SMS
              console.log(`Sending SMS to ${order.phone} with message:\n${message}`);
              await twilioClient.messages.create({
                  body: `Thank you for your order!\n${message}`,
                  from: process.env.TWILIO_PHONE_NUMBER,
                  to: phone,
              });

              console.log('SMS sent successfully.');

              // Update database
              await pool.query('UPDATE Orders SET sms_sent = TRUE WHERE UniqueID = $1', [orderId]);

              res.redirect('/admin/dashboard');
          } catch (err) {
              console.error('Error sending SMS:', err.message);
              res.status(500).send('Failed to send SMS.');
          }
      } else {
          // Handle accept/decline actions
          const status = action === 'accept' ? 'Accepted' : 'Declined';

          try {
              await pool.query('UPDATE Orders SET Status = $1 WHERE UniqueID = $2', [status, orderId]);
              console.log(`Order ${orderId} status updated to ${status}.`);
              res.redirect('/admin/dashboard');
          } catch (err) {
              console.error('Error updating order status:', err.message);
              res.status(500).send('Failed to update order status.');
          }
      }
  } catch (err) {
      console.error('Error processing action:', err.message);
      res.status(500).send('Error processing action.');
  }
});
module.exports = router;

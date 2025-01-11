const express = require('express');
const router = express.Router();
const pool = require('../../db/connection'); // Correct path to connection.js
const twilio = require('twilio');

// Configure Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Route to handle sending SMS
router.post('/orders/:orderId/send-sms', async (req, res) => {
  const { orderId } = req.params;

  try {
    console.log(`Attempting to send SMS for order ID: ${orderId}`);

    const query = `
      SELECT
        Orders.UniqueID AS order_id,
        Client.Phone_Number AS customer_phone,
        SUM(Ordered_dishes.Quantity * Dishes.Price) AS total_price,
        Orders.sms_sent
      FROM
        Orders
      JOIN
        Client ON Orders.Client_id = Client.UniqueID
      JOIN
        Ordered_dishes ON Orders.UniqueID = Ordered_dishes.Order_id
      JOIN
        Dishes ON Ordered_dishes.Dish_id = Dishes.UniqueID
      WHERE
        Orders.UniqueID = $1
      GROUP BY
        Orders.UniqueID, Client.Phone_Number, Orders.sms_sent;
    `;

    const result = await pool.query(query, [orderId]);
    const order = result.rows[0];

    if (!order) {
      console.log('Order not found.');
      return res.status(404).send('Order not found.');
    }

    if (order.sms_sent) {
      console.log(`SMS already sent for order ID: ${orderId}`);
      return res.status(400).send('SMS has already been sent.');
    }

    console.log(`Order details: ${JSON.stringify(order)}`);

    const message = await twilioClient.messages.create({
      body: `Your order #${order.order_id} has been accepted! Total Price: $${order.total_price.toFixed(
        2
      )}. Thank you for your order!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: order.customer_phone,
    });

    console.log(`SMS sent: ${message.sid}`);

    // Update `sms_sent` column
    await pool.query('UPDATE Orders SET sms_sent = TRUE WHERE UniqueID = $1', [orderId]);
    res.send('SMS sent successfully!');
  } catch (err) {
    console.error('Error sending SMS:', err);
    res.status(500).send('Error sending SMS.');
  }
});

module.exports = router;

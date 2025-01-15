const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key
const db = require('../../db/connection'); // Import database connection

// Route to render the checkout page
router.get('/', (req, res) => {
  res.render('checkout');
});

// Route to create a Payment Intent and save order details
router.post('/create-payment-intent', async (req, res) => {
  try {

    const { amount, phone, cart, email } = req.body;
    if (!amount || !phone) {
      console.error('Missing required fields: amount or phone');
      return res.status(400).json({ error: 'Amount and phone number are required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log('Payment Intent created successfully:', paymentIntent);

    const insertClient = await db.query(
      `
      INSERT INTO Client (name, Phone_number)
      VALUES ($1, $2) RETURNING UniqueID;
      `,
      [email, phone]
    )
    console.log('Client inserted successfully:', insertClient.rows[0]);

    const clientId = insertClient.rows[0].uniqueid;

    // Debug log for database insertion
    console.log('Inserting order into database with phone:', phone);

    const insertOrder = await db.query(
      `
      INSERT INTO Orders (Client_id, Status, Pickup_time, Created_at, Updated_at)
      VALUES ($1, 'Pending', NOW() + INTERVAL '30 minutes', NOW()::timestamp, NOW()::timestamp) RETURNING UniqueID;
      `,
      [clientId] // Replace `1` with actual Client ID logic
    );

    console.log('Order inserted successfully:', insertOrder.rows[0]);

    const orderId = insertOrder.rows[0].uniqueid;

    const cartArray = JSON.parse(cart);

    for(const dish of cartArray) {
      console.log('dish object:', dish);
      const id = dish["dish-id"];
      const quantity = dish["quantity"];
      console.log('Inserting dish into database:', id, quantity);

    await db.query(
      `
      INSERT INTO Ordered_Dishes (Order_id, Dish_id, Quantity)
      VALUES ($1, $2, $3)
      `,
      [orderId, id, quantity]
    )
    await db.query('COMMIT');
  }

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.log('Error creating payment', req.body);
    console.error('Error creating Payment Intent:', error);
    res.status(500).json({ error: 'Error creating Payment Intent' });
  }
});


module.exports = router;


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
    console.log('Received request:', req.body); // Log request body

    const { amount, phone } = req.body;
    if (!amount || !phone) {
      console.error('Missing required fields: amount or phone');
      return res.status(400).json({ error: 'Amount and phone number are required' });
    }

    // Debug log for Payment Intent creation
    console.log('Creating Payment Intent for amount:', amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log('Payment Intent created successfully:', paymentIntent);

    // Debug log for database insertion
    console.log('Inserting order into database with phone:', phone);

    const result = await db.query(
      `
      INSERT INTO Orders (Client_id, Status, Pickup_time, Created_at, Updated_at, Phone_Number)
      VALUES ($1, 'Pending', NOW() + INTERVAL '30 minutes', NOW(), NOW(), $2) RETURNING UniqueID;
      `,
      [1, phone] // Replace `1` with actual Client ID logic
    );

    console.log('Order inserted successfully:', result.rows[0]);

    const orderId = result.rows[0].uniqueid;

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    res.status(500).json({ error: 'Error creating Payment Intent' });
  }
});


module.exports = router;


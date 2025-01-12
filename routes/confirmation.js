const express = require('express');
const router = express.Router();

// Render the order confirmation page
router.get('/', (req, res) => {
  res.render('order_confirmation'); // Ensure you have an `order_confirmation.ejs` file in the views folder
});

module.exports = router;

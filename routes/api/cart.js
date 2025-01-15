const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

router.get('/', (req, res) => {
  res.json(cart)
});

router.post('/', (req, res) => {
  cart.push(req.body);
  localStorage.setItem('cart', JSON.stringify(cart));
});


module.exports = router;

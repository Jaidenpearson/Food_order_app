const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  res.json(cart)
});

router.post('/', (req, res) => {
  cart.push(req.body);
  req.session.cart = cart;
  res.json(req.session.cart);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  cart = cart.filter(dish => dish["dish-id"]!== id);
  req.session.cart = cart;
  res.json(cart);
});


module.exports = router;

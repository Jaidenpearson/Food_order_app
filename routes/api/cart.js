const express = require('express');
const router = express.Router();

const cart = [];

// router.post('/', (req, res) => {
//   cart.push(req.body);
//   res.send(cart);
// });

router.post('/', (req, res) => {
  cart.push(req.body);
  req.session.cart = cart;
  res.json(req.session.cart);
});


module.exports = router;

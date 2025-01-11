const express = require('express');
const router = express.Router();

const cart = [
  {
    "dish-id": "2",
    "dish-name": "Rainbow Roll",
    "dish-price": "16.99",
    "quantity": "2",
    "special-requests": ""
},
{
    "dish-id": "6",
    "dish-name": "Avocado Salad",
    "dish-price": "7.99",
    "quantity": "1",
    "special-requests": ""
},
{
    "dish-id": "9",
    "dish-name": "Spring Rolls",
    "dish-price": "6.99",
    "quantity": "1",
    "special-requests": ""
}
];

router.get('/', (req, res) => {
  res.json(cart)
});

router.post('/', (req, res) => {
  cart.push(req.body);
  req.session.cart = cart;
  res.json(req.session.cart);
});


module.exports = router;

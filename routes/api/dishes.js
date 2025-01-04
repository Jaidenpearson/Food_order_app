const express = require('express');
const router = express.Router();
const { getDishes } = require('../../db/queries/dishes');

router.get('/', (req, res) => {
  getDishes()
    .then(dishes => {
      res.json(dishes);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

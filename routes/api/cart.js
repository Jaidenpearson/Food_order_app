const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('POST /api/cart called');
  console.log('req.body:', req.body);
  res.json(req.body);
});


module.exports = router;

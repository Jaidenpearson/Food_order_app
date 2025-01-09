const express = require('express');
const router = express.Router();
const app = express();
const cookieSession = require('cookie-session');


router.post('/', (req, res) => {
  app.use(cookieSession({
    name: `session`,
    keys: ['key1', 'key2'],
  }))
  console.log('POST /api/cart called');;
  res.json(req.body);
});


module.exports = router;

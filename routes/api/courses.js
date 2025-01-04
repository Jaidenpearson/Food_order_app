const express = require('express');
const router = express.Router();
const { getCourse } = require('../../db/queries/dishes');

router.get('/', (req, res) => {
  getCourse()
    .then(courses => {
      console.log(courses);
      res.json(courses);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

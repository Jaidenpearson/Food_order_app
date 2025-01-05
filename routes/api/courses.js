const express = require('express');
const router = express.Router();
const { getCourse } = require('../../db/queries/dishes');

router.get('/', (req, res) => {
  console.log('GET /api/courses called');
  getCourse()
    .then(courses => {
      res.json(courses);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

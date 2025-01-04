const db = require('../connection');

const getDishes = () => {
  return db.query('SELECT * FROM Dishes;')
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

module.exports = { getDishes };

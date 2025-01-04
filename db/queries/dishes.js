const db = require('../connection');

const getDishes = () => {
  return db.query('SELECT * FROM Dishes;')
    .then(data => {
      return data.rows;
    });
};

const getCourse = () => {
  return db.query(`SELECT dishes.courses
    FROM dishes
    GROUP BY courses;`)
    .then(data => {
      return data.rows;
    });
}

module.exports = { getDishes, getCourse };

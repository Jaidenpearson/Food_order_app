const db = require('../connection');

const getDishes = () => {
  return db.query('SELECT * FROM Dishes;')
    .then(data => {
      return data.rows;
    });
};

const getCourse = () => {
  return db.query('SELECT DISTINCT Courses FROM Dishes')
    .then(res => res.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};


module.exports = { getDishes, getCourse };

const db = require('../connection');

const getDishes = () => {
  // Query the public.dishes table
  return db.query('SELECT * FROM public.dishes;')
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('Error querying dishes table:', err.stack);
      throw err; // Re-throw the error to be handled by the caller
    });
};

const getCourse = () => {
  // Query distinct courses from public.dishes
  return db.query('SELECT DISTINCT courses FROM public.dishes;')
    .then(res => res.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err; // Re-throw the error to be handled by the caller
    });
};

module.exports = { getDishes, getCourse };


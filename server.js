// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

//allows express to pull static files from the public directory
app.use('/public', express.static(__dirname + "/public"));

app.set('view engine', 'ejs');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin')
const dishesRoutes = require('./routes/api/dishes');
const coursesRoutes = require('./routes/api/courses');
const cartRoutes = require('./routes/api/cart');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/users', usersRoutes);
app.use('/admin', adminRoutes)
app.use('/api/dishes', dishesRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/cart', cartRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

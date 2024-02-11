if (process.env.USER) require('dotenv').config();
const express = require('express');

const app = express();

// Done: Add your code here
const cors = require('cors');

const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');


app.use(express.json());
app.use(cors());
app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);
app.use('/reviews', reviewsRouter);


// Middleware for handling 404 Not Found errors

app.use(notFound);

// Middleware for handling other errors
app.use(errorHandler);

module.exports = app;
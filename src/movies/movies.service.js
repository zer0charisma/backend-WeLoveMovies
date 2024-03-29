const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');


const reduceCritics = mapProperties({
  critic_id: 'critic.critic_id',
  organization_name: 'critic.organization_name',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
});

// Function to list all movies
function list() {
  return knex('movies').select('*');
}

// Function to list currently showing movies

function listMoviesCurrentlyShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .distinct('m.*')
    .where({ 'mt.is_showing': true })
    .orderBy('m.movie_id');
}

// Function to read details of a specific movie by ID

function read(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

// Function to read theaters associated with a specific movie by ID

function readTheatersByMovie(movieId) {
  return knex('theaters as t')
    .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
    .select('t.*', 'mt.*')
    .where({ 'mt.movie_id': movieId })
    .orderBy('t.theater_id');
}

// Function to read reviews associated with a specific movie by ID

function readReviewsByMovie(movieId) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.*', 'c.*')
    .where({ 'r.movie_id': movieId })
    .then((reviews) => reviews.map((review) => reduceCritics(review)));
}

// exports 

module.exports = {
  list,
  listMoviesCurrentlyShowing,
  read,
  readTheatersByMovie,
  readReviewsByMovie,
};
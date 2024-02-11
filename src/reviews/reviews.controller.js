const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// to check if a review with the specified ID exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  // If the review does not exist, respond with a 404 error
  next({ status: 404, message: 'Review cannot be found.' });
}

// Function to update a review

async function update(req, res, next) {
  const { review_id } = res.locals.review;
  const updatedReview = {
    ...req.body.data,
    review_id,
  };
  await reviewsService.update(updatedReview);
  res.json({ data: await reviewsService.read(review_id) });
}

// function to delete a review
async function destroy(req, res, next){
  const { review_id } = res.locals.review;
  await reviewsService.delete(review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
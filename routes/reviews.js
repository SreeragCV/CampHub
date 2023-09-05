const express = require('express');
const router = express.Router({ mergeParams : true });
const { reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const { validateReview, isLoggedIn } = require('../middleware.js') 


router.post('/', isLoggedIn, validateReview, catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync( async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;
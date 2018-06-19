var express = require('express');
var router = express.Router();

var episodesController = require('../controllers/episodes.controllers.js')
var reviewsController = require('../controllers/reviews.controllers.js');

router
 .route('/episodes/:episodeID/reviews')
 .get (reviewsController.reviewsGetAll)
 .post(reviewsController.reviewsAddOne);

router
 .route('/episodes/:episodeID/reviews/:reviewID')
 .get (reviewsController.reviewsGetOne)
 .put(reviewsController.reviewsUpdateOne)
 .delete(reviewsController.reviewsDeleteOne);

router
    .route('/episodes')
    .get(episodesController.getAllEpisodes)
    .post(episodesController.addAnEpisode);

router
    .route('/episodes/:episodeID')
    .get(episodesController.getAnEpisode)
    .put(episodesController.updateOneEpisode)
    .delete(episodesController.episodesDeleteOne);

    module.exports = router
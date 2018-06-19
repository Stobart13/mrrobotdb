var mongoose = require('mongoose');
var Episodes = mongoose.model('Episodes');

module.exports.reviewsGetAll = function (req, res) {
    var episodeID = req.params.episodeID;
    console.log("GET reviews for Episode " + episodeID);
    Episodes
        .findById(episodeID)
        .select("reviews")
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc.reviews);
                console.log("Number of Reviews: " +doc.reviews.length);
        });
};

module.exports.reviewsGetOne = function (req, res) {
    var episodeID = req.params.episodeID;
    var reviewID = req.params.reviewID;
    console.log("GET reviewID " + reviewID);
    Episodes
        .findById(episodeID)
        .select("reviews")
        .exec(function (err, doc) {
            var review = doc.reviews.id(reviewID);
            res
                .status(200)
                .json(review);
        });
};

module.exports.reviewsAddOne = function (req, res, doc) {
    var episodeID = req.params.episodeID;
    console.log("GET reviews for episode " +
        episodeID);
    Episodes
        .findById(episodeID)
        .select("reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding episode");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Episode ID not found" +
                    episodeID
                };
            } else {
                response.message = doc.reviews ?
                    doc.reviews : []
            };
            if (doc) {
                addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
}

var addReview = function (req, res, thisEpisode) {
    thisEpisode.reviews.push({
        username: req.body.username,
        votes: { "useful": 0, 
                "useless": 0 },
        text: req.body.text,
        stars: parseInt(req.body.stars)
    });
    thisEpisode.save(function (err, updatedEpisode) {
        var newReviewPosition =
            updatedEpisode.reviews.length - 1;
        var newReview =
            updatedEpisode.reviews[newReviewPosition];
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(newReview);
        };
    });
}

var updateReviewCount = function(req, thisEpisode) {
    episodeID = thisEpisode.req.params.episodeID;
    console.log("Current Review Count is" +episodeID.reviews.length);
    Episodes
        .findByIdAndUpdate(episodeID)
        .select('reviews')
        .exec(function(req, res, doc, err){
            var reviewCount = thisEpisode.episodeID.reviews.length +1;
            if(err){
                res
                    .status(500)
                    .json(err)
            } else {
                res
                    .status(201)
                    .json(doc.reviews.length)
            }
        })
}

module.exports.reviewsUpdateOne = function (req, res) {
    var episodeID = req.params.episodeID;
    var reviewID = req.params.reviewID;
    console.log('PUT reviewID ' + reviewID +
        ' for episodeID ' + episodeID);
    Episodes
        .findById(episodeID)
        .select('reviews')
        .exec(function (err, thisEpisode) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding episode");
                response.status = 500;
                response.message = err;
            } else if (!thisEpisode) {
                console.log("Episode ID not found", id);
                response.status = 404;
                response.message = {
                    "message": "Episode ID not found " + id
                };
            } else {
                // get review and edit
                thisReview = thisEpisode.reviews.id(reviewID);
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
                // now check for an error and save
                thisReview.username = req.body.username;
                thisReview.text = req.body.text;
                thisReview.stars = parseInt(req.body.stars);
                thisEpisode.save(function (err, updatedEpisode) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

module.exports.reviewsDeleteOne = function (req, res) {
    var episodeID = req.params.episodeID;
    var reviewID = req.params.reviewID;
    console.log('PUT reviewID ' + reviewID +
        ' for episodeID ' + episodeID);
    Episodes
        .findById(episodeID)
        .select('reviews')
        .exec(function (err, thisEpisode) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding Episode");
                response.status = 500;
                response.message = err;
            } else if (!thisEpisode) {
                console.log("Episode ID not found", id);
                response.status = 404;
                response.message = {
                    "message": "Episode ID not found " + id
                };
            } else {
                // get review and edit
                thisReview = thisEpisode.reviews.id(reviewID);
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
                // now check for an error and save
                thisEpisode.reviews.id(reviewID).remove();
                thisEpisode.save(function (err, updatedEpisode) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

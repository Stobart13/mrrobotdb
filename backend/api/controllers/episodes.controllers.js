var mongoose = require('mongoose');
var Episodes = mongoose.model('Episodes');
var maxNumber = 10;

module.exports.getAllEpisodes = function (req, res) {

    // var start = 0;
    // var number = 5;

    // if (req.query && req.query.start) {
    //     start = parseInt(req.query.start);
    // }
    // if (req.query && req.query.number) {
    //     number = parseInt(req.query.number);
    // }

    // if (isNaN(start) || isNaN(number)) {
    //     res
    //         .status(400)
    //         .json({ "message": "If supplied in querystring, start and number must be numeric" });
    //     return;
    // }

    // if (number > maxNumber) {
    //     res
    //         .status(400)
    //         .json({ "message": "Max value for number is " + maxNumber });
    //     return;
    // }

    Episodes
        .find()
        .exec(function (err, docs) {
            if (err) {
                console.log("Error finding Episodes");
                res
                    .status(500)
                    .json(err)
            } else {
                console.log("Retrieved the data for " + docs.length + " Episodes");
                res
                    .status(200)
                    .json(docs);
            }
        });
}

module.exports.getAnEpisode = function (req, res) {
    var episodeID = req.params.episodeID;
    console.log("GET episode " + episodeID);
    Episodes
        .findById(episodeID)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                response.status = 500;
                response.message = err
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message":
                    "Episode ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
}


module.exports.addAnEpisode = function (req, res) {
    Episodes
        .create({
            name: req.body.name,
            stars: parseInt(req.body.stars),
            season: parseInt(req.body.season),
            episodeNumber: parseInt(req.body.episodeNumber),
            airdate: req.body.airdate,
            airtime: parseInt(req.body.airtime),
            runtime: parseInt(req.body.runtime),
            image: req.body.image,
            review_count: 0,
            summary: req.body.summary,
            reviews: [],
        }, function (err, newEpisode) {
            if (err) {
                console.log("Error creating Episode");
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(newEpisode);
            }
        });
}

module.exports.updateOneEpisode = function (req, res) {
    var episodeID = req.params.episodeID;
    console.log("GET episode " + episodeID);
    Episodes
        .findById(episodeID)
        .select("-reviews")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            }
            if (err) {
                console.log("Error finding episode")
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Episode ID not found"
                };
            }
            console.log("Found episode " + episodeID);
            if (response.status != 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.season = req.body.season,
                    doc.episodeNumber = req.body.episodeNumber
                doc.airdate = req.body.airdate,
                    doc.airtime = req.body.airtime,
                    doc.runtime = req.body.runtime,
                    doc.summary = req.body.summary
            };
            doc.save(function (err, updatedEpisode) {
                if (err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res

                        .status(204)
                        .json();
                };
            });
        });
};
module.exports.episodesDeleteOne = function (req, res) {
    var episodeID = req.params.episodeID;
    Episodes
        .findByIdAndRemove(episodeID)
        .exec(function (err, thisEpisode) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Episode " + episodeID
                    + " deleted");
                res
                    .status(204)
                    .json();
            }
        })
};
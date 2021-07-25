var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema({
    useful: Number,
    useless: Number
});

var reviewSchema = new mongoose.Schema({
    username: String,
    votes: votesSchema,
    text: String,
    stars: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

var episodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    season: Number,
    episodeNumber: Number,
    review_count: Number,
    airdate: String,
    image: String,
    runtime: Number,
    summary: String,
    reviews: [reviewSchema]
});

mongoose.model('Episodes', episodeSchema, 'Episodes');
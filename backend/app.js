require('./api/data/dbConnect.js');

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./api/routes')

app.set('port', 3000);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());

app.use('/css', function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use('/api', routes);



/*
app.get('/', function(req, res) {
    console.log('GET the homepage');
    res
        .status(200)
        .sendFile( path.join(__dirname, 'public', 'index.html'));
});
*/

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("Express listening on port 3000");
});
console.log("Starting the server");

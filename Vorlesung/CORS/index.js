var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342'); /*check adress*/
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

//app.use(allowCrossDomain);

app.get('/data', function (req, res) {
    res.json({a: "hello", b: "world"});
});

app.use(express.static(__dirname));

app.listen(3000, "lvh.me", function () {
    console.log('Example app listening on port http://lvh.me:3000/');
});
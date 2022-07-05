import express from 'express';
const app = express();

const allowCrossDomain = function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); /*check adress*/
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.get('/data', function (req, res) {
    res.json({a: "hello", b: "world"});
});


app.listen(3000, function () {
    console.log('Example app listening on port http://localhost:3000/');
});

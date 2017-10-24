var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(3001, function () {
    console.log('Example app listening on port http://localhost:3001/');
});
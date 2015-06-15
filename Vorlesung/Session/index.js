var http = require('http');
var express = require('express');
var app = express();
var session = require('express-session');

app.use(require("cookie-parser")());
app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));


app.get("/*", function(req,res){
    console.log(JSON.stringify(req.cookies))
    res.end("Hi");
});
http.createServer(app).listen(3000);


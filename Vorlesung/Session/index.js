var express = require('express');
var session = require('express-session');

var app = express();

app.use(require("cookie-parser")());
app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true }));


app.get("/*", function(req,res){
    console.log(JSON.stringify(req.cookies));
    if(req.session.counter){
        req.session.counter++;
    }
    else {
        req.session.counter = 1;
    }
    res.end(`Dein ${req.session.counter} besuch`);
});

app.listen(3000, function(){
    console.log('listening on http://localhost:3000');
});
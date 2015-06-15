var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var session = require("express-session");

var app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var router = express.Router();


app.use(require("cookie-parser")());
app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use("/", require('./routes/indexRoutes.js'));
app.use("/orders", require('./routes/orderRoutes.js'));
app.get("/ajax", function(req, res){
    res.sendfile("./public/html/ajaxSample.html")
});

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))


http.createServer(app).listen(3000);

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

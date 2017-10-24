const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const session = require("express-session");
const jwt = require('express-jwt');

const app = express();

const jwtSecret =  'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "1d", audience :"self", issuer : "pizza"});
app.set("jwt-validate", {secret: jwtSecret, audience :"self", issuer : "pizza"});


app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(require("cookie-parser")());
app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use("/", require('./routes/indexRoutes.js'));

app.use(jwt({
    secret: app.get("jwt-secret"),
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.session.token && req.session.token) {
            return req.session.token;
        }
        return null;
    }
}));

app.use("/orders", require('./routes/orderRoutes.js'));
app.get("/ajax", function(req, res){
    res.sendFile("/html/ajaxSample.html",  {root: __dirname + '/public/'});
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

app.use(bodyParser.json());
const jwtSecret =  'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "1d", audience :"self", issuer : "pizza"});
app.set("jwt-validate", {secret: jwtSecret, audience :"self", issuer : "pizza"});

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

app.use("/", require('./routes/indexRoutes.js'));
app.use(jwt( app.get("jwt-validate"))); //after this middleware a token is required!
app.use("/orders", require('./routes/orderRoutes.js'));


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3003;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

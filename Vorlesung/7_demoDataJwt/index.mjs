import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import jwt from 'express-jwt';

import {indexRoutes} from './routes/indexRoutes';
import {orderRoutes} from './routes/orderRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());
const jwtSecret = 'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "pizza"});
app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "pizza"});


app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});


app.use("/", indexRoutes);
app.use(jwt( app.get("jwt-validate"))); //after this middleware a token is required!
app.use("/orders", orderRoutes);


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
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
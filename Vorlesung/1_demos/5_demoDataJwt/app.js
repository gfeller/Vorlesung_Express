import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';
import {expressjwt} from 'express-jwt';


import {indexRoutes} from './routes/index-routes.js';
import {orderRoutes} from './routes/order-routes.js';
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());
const jwtSecret = 'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';

app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "pizza"});
app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "pizza", algorithms: ["HS256"] });

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});
app.use(expressjwt(app.get("jwt-validate")).unless({path: [/\/login*/]})); //after this middleware a token is required!
app.use((req, res, next) => {
    console.log(req.auth || "no user");
    next();
});
app.use("/", indexRoutes);
app.use("/orders", orderRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    } else {
        next(err);
    }
});

import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';
import {expressjwt} from 'express-jwt';


import {indexRoutes} from './routes/index-routes.js';
import {orderRoutes} from './routes/order-routes.js';
import {fileURLToPath} from "url";
import {CONFIG} from '../shared.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});

app.use(expressjwt(CONFIG.jwt_validate).unless({path: [/\/login*/]})); //after this middleware a token is required!

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

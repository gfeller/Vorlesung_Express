import express from 'express';

import {expressjwt} from 'express-jwt';


import {indexRoutes} from './routes/index-routes.js';
import {orderRoutes} from './routes/order-routes.js';
import {CONFIG} from '../shared.js';

export const app = express();

app.use(express.static(CONFIG.public));

app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: CONFIG.public});
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

import express, {NextFunction, Request, Response} from "express";
import path from 'path';
import cors from 'cors';
import {expressjwt} from "express-jwt";

import {indexRoutes} from './routes/index-routes';
import {orderRoutes} from './routes/order-routes';

import {CONFIG} from "./config";


export const app = express();

app.use(cors());
app.use(express.static(path.resolve('public')));

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: path.resolve('public')});
});
app.use(express.json());

app.use(expressjwt(CONFIG.jwt_validate).unless({path: [/\/login*/]}));
app.use("/", indexRoutes);
app.use("/orders", orderRoutes);


app.use(function (err: Error, req: Request, res:Response, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    } else {
        next(err);
    }
});

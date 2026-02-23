import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/index-routes.js';
import {orderRoutes} from './routes/order-routes.js';
import {handlebarHelpers} from '../2_demoView/utils/handlebar-util.js'
import {overrideMiddleware} from "../2_demoView/utils/method-override.js";

import {PATHS} from "../2_demoView/config.js";

export const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...handlebarHelpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.set('views', [PATHS.views, PATHS.viewsDefault]);
app.use(express.static(PATHS.publicDefault));

app.use(express.static(path.resolve('public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));

app.use((req, res, next) => {
    console.log(req.session.user || "no user");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(overrideMiddleware);

app.use("/orders", orderRoutes);
app.use("/", indexRoutes);

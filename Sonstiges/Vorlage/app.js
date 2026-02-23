import express from 'express';
import path from 'path';
import session from 'express-session';
import exphbs from 'express-handlebars';

import {indexRoutes} from './routes/index-routes.js';
import {helpers} from './utils/handlebar-util.js'
import {sessionUserSettings} from './utils/session-middleware.index.js'


export const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));

app.use(express.static(path.resolve('public')));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(sessionUserSettings);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", indexRoutes);

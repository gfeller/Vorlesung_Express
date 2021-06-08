import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/indexRoutes.js';
import {registerHelpers} from './utils/handlebar-util.js'

export const app = express();
app.engine('hbs', hbs.express4({
    defaultLayout: "views/layout/default.hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);

app.use(express.static(path.resolve('public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRoutes);

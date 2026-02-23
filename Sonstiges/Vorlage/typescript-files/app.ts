/*
import express from 'express';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/index-routes';
import {helpers} from './services/handlebar-util'


import exphbs from 'express-handlebars';
import {sessionUserSettings, Settings} from "./services/session-middleware";

declare module 'express-session' {
    interface SessionData {
        settings: Settings;
    }
}

declare global {
    namespace Express {
        interface Request {
            settings: Settings;
        }
    }
}

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

app.use(sessionUserSettings)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", indexRoutes);
*/

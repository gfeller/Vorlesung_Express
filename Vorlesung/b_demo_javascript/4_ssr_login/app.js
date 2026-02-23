import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import {indexRoutes} from './routes/index-routes.js';
import {orderRoutes} from './routes/order-routes.js';
import {handlebarHelpers} from '../shared.js'
import {overrideMiddleware} from '../shared.js'
import {securityService} from "./services/security-service.js";
import {CONFIG} from "../shared.js";

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
app.set('views', [CONFIG.views, CONFIG.viewsDefault]);
app.use(express.static(CONFIG.publicDefault));

app.use(express.static(CONFIG.public));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));

app.use(securityService.handleAuthenticate)

app.use((req, res, next) => {
    console.log(req.session.user || "no in user in session");
    console.log(req.user || "no user in app");
    next();
});

app.use(express.urlencoded({extended: false}));
app.use(overrideMiddleware);

app.use("/", indexRoutes);
app.use("/{*splat}", securityService.ensureAuthenticated);
app.use("/orders", orderRoutes);



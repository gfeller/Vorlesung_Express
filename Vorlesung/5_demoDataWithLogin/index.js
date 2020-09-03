import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import session from 'express-session';
import {indexRoutes} from './routes/indexRoutes.js';
import {orderRoutes} from './routes/orderRoutes.js';
import {registerHelpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";


const app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);

const router = express.Router();

app.use(express.static(path.resolve('public')));

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(overrideMiddleware);

app.use("/orders", orderRoutes);
app.use("/", indexRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

import express from 'express';
import {orderRoutes} from './routes/order-routes.js';
import {helpers} from '../2_demoView/utils/handlebar-util.js'
import {overrideMiddleware} from "../2_demoView/utils/method-override.js";


// 1. import express-handlebars
import exphbs from 'express-handlebars';
import {PATHS} from "../2_demoView/config.js";

const app = express();

// 2. configure
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

// 3. set engine and global values
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// 4. path to views
console.log(PATHS)
app.set('views', [PATHS.views, PATHS.viewsDefault]);
app.use(express.static(PATHS.public));
app.use(express.urlencoded({extended: false}));
app.use(overrideMiddleware);
app.use(orderRoutes);


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

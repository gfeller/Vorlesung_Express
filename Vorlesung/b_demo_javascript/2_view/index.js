import express from 'express';

import {orderRoutes} from './routes/order-routes.js';
import {handlebarHelpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";
import {CONFIG} from "./config.js";

// 1. import express-handlebars
import exphbs from 'express-handlebars';

const app = express();

// 2. configure
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...handlebarHelpers
    }
});

// 3. set engine and global values
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// 4. path to views
app.set('views', [CONFIG.views, CONFIG.viewsDefault]);
app.use(express.static(CONFIG.public));
app.use(express.urlencoded({extended: false}));
app.use(overrideMiddleware);
app.use(orderRoutes);


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, (error) => {
    if(error){
        console.error(error);
    }else{
        console.log(`Server running at http://${hostname}:${port}/`);
    }
});

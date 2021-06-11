import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {randomRoutes} from './routes/random.js';
import {helpers} from './utils/handlebar-util.js'
import exphbs from 'express-handlebars';


const app = express();
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(randomRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

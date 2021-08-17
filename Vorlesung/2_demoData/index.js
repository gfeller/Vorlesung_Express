import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override"
import {orderRoutes} from './routes/order-routes.js'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(methodOverrideFn));

function methodOverrideFn(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}

app.use(orderRoutes);
app.use(express.static('./public'));


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

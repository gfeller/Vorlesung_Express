import express from 'express';
import methodOverride from "method-override"
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();


function showIndex(req, res)
{
    res.type('text/html');
    res.write("<html>");

    res.write("<img src='/images/pizza.jpg'>");
    res.write("<p>Willkommen! Zu der besten Pizzaria auf der Welt!</p>");
    res.write("<form action='/orders' method='get'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
}

function createOrder(req, res)
{

    res.type('text/html');
    res.write("<html>");
    res.write("<p>Was fuer eine Pizze haetten Sie den gerne?</p>");
    res.write("<form action='/orders' method='post'><input name='name' placeholder='pizza name'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
}

function createPizza(req, res)
{
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Erfolgreich!</p>");
    res.write("<p>Ihre order: "+ req.body.name+"</p>");
    res.write("<p>Ihre Nummer: 1 !</p>");
    res.write("<p><a href='/orders/1/'>Zeige order an</a></p>");
    res.end("</html>");
}

function showOrder(req, res)
{
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Order-Number: "+ req.params.id+"</p>");
    res.write("<p>Status: OK</p>");
     res.write("<form action='/orders/"+ req.params.id +"' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
    res.end("</html>");
}

function deleteOrder(req, res)
{
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Order-Number: "+ req.params.id+"</p>");
    res.write("<p>Status: Deleted</p>");
    res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
    res.end("</html>");
}

router.get("/", showIndex)
router.get("/orders", createOrder);
router.post("/orders", createPizza);
router.get("/orders/:id", showOrder);
router.delete("/orders/:id/", deleteOrder)



function methodOverrideFn(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}

function myDummyLogger( options ){
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next)
    {
        console.log(req.method +":"+ req.url);
        next(new Error("you did something wrong!"));
    }
}

function notFound(req,res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.status(404).send( "Confound it all!  We could not find ye's page! ")
}

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}


app.use(express.static( 'public'));
app.use(myDummyLogger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(methodOverrideFn));
app.use(router);
app.use(notFound);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

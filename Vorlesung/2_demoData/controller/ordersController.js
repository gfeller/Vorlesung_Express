import {orderStore} from '../services/orderStore.js'


export function showIndex(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Willkommen! Zu der besten Pizzaria auf der Welt!</p>");
    res.write("<img src='/images/pizza.jpg'>");
    res.write("<form action='/orders' method='get'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
};

export function createOrder(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Was fuer eine Pizze haetten Sie den gerne?</p>");
    res.write("<form action='/orders' method='post'><input name='name' placeholder='pizza name'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
};

export function createPizza(req, res) {
    let order = orderStore.add(req.body.name, "unkown");
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Erfolgreich!</p>");
    res.write("<p>Ihre order: " + order.pizzaName + "</p>");
    res.write("<p>Ihre Nummer: " + order.id + " !</p>");
    res.write("<p><a href='/orders/" + order.id + "/'>Zeige order an</a></p>");
    res.end("</html>");
};

export function showOrder(req, res) {
    let order = orderStore.get(Number(req.params.id));
    res.type('text/html');
    res.write("<html>");
    if (order) {
        res.write("<p>Order-Number: " + order.id + "</p>");
        res.write("<p>Status: " + order.state + "</p>");
        if (order.state === "OK") {
            res.write("<form action='/orders/" + order.id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
        }
    }
    res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
    res.end("</html>");
};

export function deleteOrder(req, res) {
    let order = orderStore.delete(Number(req.params.id));
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Order-Number: " + order.id + "</p>");
    res.write("<p>Status: " + order.state + "</p>");
    res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
    res.end("</html>");
};

import {orderStore} from '../../shared.js'

export class OrdersController {
    createOrder = (req, res) => {
        res.render("newOrder");
    };

    createPizza = async (req, res) => {
        res.render("succeeded", await orderStore.add(req.body.name, req.user.email));
    };

    showOrder = async (req, res) => {
        res.render("showorder", await orderStore.get(req.params.id));
    };

    deleteOrder = async (req, res) => {
        res.render("showorder", await orderStore.delete(req.params.id));
    };

}

export const ordersController = new OrdersController();

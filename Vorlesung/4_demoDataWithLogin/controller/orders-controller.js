import {orderStore} from '../services/order-store.js'
import {SecurityUtil} from '../utils/security.js'

export class OrdersController {
    createOrder = (req, res) => {
        res.render("newOrder");
    };

    createPizza = async (req, res) => {
        res.render("succeeded", await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    showOrder = async (req, res) => {
        res.render("showorder", await orderStore.get(req.params.id));
    };

    deleteOrder = async (req, res) => {
        res.render("showorder", await orderStore.delete(req.params.id));
    };

}

export const ordersController = new OrdersController();

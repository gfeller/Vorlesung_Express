import {orderStore} from '../services/orderStore.js'
import {SecurityUtil} from '../utils/security.js'

export class OrdersController {
    createOrder(req, res) {
        res.render("newOrder");
    };

    async createPizza(req, res) {
        res.render("succeeded", await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    async showOrder(req, res) {
        res.render("showorder", await orderStore.get(req.params.id));
    };

    async deleteOrder(req, res) {
        res.render("showorder", await orderStore.delete(req.params.id));
    };

}

export const ordersController = new OrdersController();
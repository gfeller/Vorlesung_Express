import {orderStore} from '../services/orderStore'
import {SecurityUtil} from '../utils/security'

export class OrdersController {

    async getOrders(req, res) {
        res.json((await orderStore.all(SecurityUtil.currentUser(req)) || []))
    };

    async createPizza(req, res) {
        res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    async showOrder(req, res) {
        res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    async deleteOrder(req, res) {
        res.json(await orderStore.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const ordersController = new OrdersController();
import {orderStore} from '../../shared.js'
import {securityService} from '../services/security-service.js'

export class OrdersController {

    getOrders = async (req, res) => {
        res.json((await orderStore.all(securityService.currentUser(req)) || []))
    };

    createPizza = async (req, res) => {
        res.json(await orderStore.add(req.body.name, securityService.currentUser(req)));
    };

    showOrder = async (req, res) => {
        res.json(await orderStore.get(req.params.id, securityService.currentUser(req)));
    };

    deleteOrder = async (req, res) => {
        res.json(await orderStore.delete(req.params.id, securityService.currentUser(req))); // TODO should return 402 if not ok
    };
}

export const ordersController = new OrdersController();

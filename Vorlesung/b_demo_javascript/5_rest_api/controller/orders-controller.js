import {orderStore} from '../../shared.js'
import {securityService} from '../services/security-service.js'

export class OrdersController {

    getOrders = async (req, res) => {
        res.json((await orderStore.all(securityService.currentUser(req)) || [])) // Note: Should only return own orders
    };

    createPizza = async (req, res) => {
        res.json(await orderStore.add(req.body.name, securityService.currentUser(req)));
    };

    showOrder = async (req, res) => {
        res.json(await orderStore.get(req.params.id, securityService.currentUser(req))); // Note: Should return 402 if permission failed. Error is detected by unit tests
    };

    deleteOrder = async (req, res) => {
        res.json(await orderStore.delete(req.params.id, securityService.currentUser(req))); // Note: Should return 402 if permission failed. Error is detected by unit tests
    };
}

export const ordersController = new OrdersController();

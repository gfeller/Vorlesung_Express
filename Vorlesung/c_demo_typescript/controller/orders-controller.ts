import {Request, Response} from "express";
import {securityService} from '../services/security-service'
import {orderStore} from "../services/order-store";

export class OrdersController {

    getOrders = async (req: Request, res: Response) => {
        res.json(await orderStore.all())
    };

    createPizza = async (req: Request, res: Response) => {
        res.json(await orderStore.add(req.body.name, securityService.currentUser(req)));
    };

    showOrder = async (req: Request<{id: string}>, res: Response) => {
        res.json(await orderStore.get(req.params.id));
    };

    deleteOrder = async (req: Request<{id: string}>, res: Response) => {
        res.json(await orderStore.delete(req.params.id)); // Note: Should return 402 if permission failed. Error is detected by unit tests
    };
}

export const ordersController = new OrdersController();

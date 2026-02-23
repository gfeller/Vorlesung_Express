import {orderStore} from '../services/order-store'
import {SecurityUtil} from '../utils/security'
import {Request, Response} from "express";

export class OrdersController {
    createOrder = (req: Request, res: Response) => {
        res.render("newOrder");
    };

    createPizza = async (req: Request, res: Response) => {
        res.render("succeeded", await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    showOrder = async (req: Request, res: Response) => {
        res.render("showorder", {} );
    };

    deleteOrder = async (req: Request, res: Response) => {
        res.render("showorder", await orderStore.delete(req.params.id));
    };

}

export const ordersController = new OrdersController();

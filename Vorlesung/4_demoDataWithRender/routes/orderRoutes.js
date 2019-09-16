import express from 'express';
const router = express.Router();
import {ordersController} from '../controller/ordersController.js';

router.get("/", ordersController.showIndex.bind(ordersController));
router.get("/orders", ordersController.createOrder.bind(ordersController));
router.post("/orders", ordersController.createPizza.bind(ordersController));
router.get("/orders/:id/", ordersController.showOrder.bind(ordersController));
router.delete("/orders/:id/", ordersController.deleteOrder.bind(ordersController));

export const orderRoutes = router;

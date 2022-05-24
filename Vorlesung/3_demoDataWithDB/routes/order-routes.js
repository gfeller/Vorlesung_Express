import express from 'express';
const router = express.Router();
import * as ordersController from '../controller/orders-controller.js';

router.get("/", ordersController.showIndex);
router.get("/orders", ordersController.createOrder);
router.post("/orders", ordersController.createPizza);
router.get("/orders/:id/", ordersController.showOrder);
router.delete("/orders/:id/", ordersController.deleteOrder);




export const orderRoutes = router;

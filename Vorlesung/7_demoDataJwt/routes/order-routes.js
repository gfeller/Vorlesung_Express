import express from 'express';

const router = express.Router();
import {ordersController} from '../controller/orders-controller.js';

router.get("/", ordersController.getOrders);
router.post("/", ordersController.createPizza);
router.get("/:id/", ordersController.showOrder);
router.delete("/:id/", ordersController.deleteOrder);

export const orderRoutes = router;

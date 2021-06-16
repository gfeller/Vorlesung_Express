import express from 'express';
const router = express.Router();
import {ordersController} from '../controller/ordersController.js';

router.get("/", ordersController.getOrders);
router.post("/", ordersController.createPizza);
router.get("/:id/", ordersController.showOrder);
router.delete("/:id/", ordersController.deleteOrder);

export const orderRoutes = router;

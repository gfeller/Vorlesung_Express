import express from 'express';
const router = express.Router();
import {ordersController} from '../controller/ordersController.js';
import {SecurityUtil} from "../utils/security.js";

router.all("/*", SecurityUtil.handleAuthenticate);
router.get("/", ordersController.createOrder.bind(ordersController));
router.post("/", ordersController.createPizza.bind(ordersController));
router.get("/:id/", ordersController.showOrder.bind(ordersController));
router.delete("/:id/", ordersController.deleteOrder.bind(ordersController));

export const orderRoutes = router;

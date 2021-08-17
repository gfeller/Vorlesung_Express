import express from 'express';

const router = express.Router();
import {ordersController} from '../controller/orders-controller.js';
import {SecurityUtil} from "../utils/security.js";

router.all("/*", SecurityUtil.handleAuthenticate);
router.get("/", ordersController.createOrder);
router.post("/", ordersController.createPizza);
router.get("/:id/", ordersController.showOrder);
router.delete("/:id/", ordersController.deleteOrder);

export const orderRoutes = router;

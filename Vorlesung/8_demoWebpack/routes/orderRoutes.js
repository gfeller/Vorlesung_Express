const express = require('express');
const router = express.Router();
const orders = require('../controller/ordersController.js');

router.get("/", orders.getOrders);
router.post("/", orders.createPizza);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);

module.exports = router;
var express = require('express');
var router = express.Router();
var orders = require('../controller/ordersController.js');

router.get("/", orders.showIndex);
router.get("/orders", orders.createOrder);
router.post("/orders", orders.createPizza);
router.get("/orders/:id/", orders.showOrder);
router.delete("/orders/:id/", orders.deleteOrder);

module.exports = router;
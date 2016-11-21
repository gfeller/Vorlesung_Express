var express = require('express');
var router = express.Router();
var orders = require('../controller/ordersController.js');

router.post("/", orders.createPizza);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);

module.exports = router;
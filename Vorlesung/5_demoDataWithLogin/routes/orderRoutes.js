var express = require('express');
var router = express.Router();
var orders = require('../controller/ordersController.js');
var util = require('../util/security');


router.all("/*", util.handleAuthenticate);
router.get("/", orders.createOrder);
router.post("/", orders.createPizza);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);

module.exports = router;
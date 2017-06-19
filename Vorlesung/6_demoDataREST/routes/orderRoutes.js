const express = require('express');
const router = express.Router();
const orders = require('../controller/ordersController.js');
const util = require('../util/security');


router.all("/*", util.handleAuthenticate);
router.get("/", orders.createOrder);
router.post("/", orders.createPizza);
router.get("/:id/", orders.showOrder);
router.delete("/:id/", orders.deleteOrder);

module.exports = router;
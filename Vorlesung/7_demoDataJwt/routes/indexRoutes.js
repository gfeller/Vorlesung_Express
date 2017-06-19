const express = require('express');
const indexController = require('../controller/indexController');

const router = express.Router();

router.post("/login", function(req, res){
    indexController.login(req,res);
});

module.exports = router;

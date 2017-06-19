const express = require('express');
const indexController = require('../controller/indexController');

const router = express.Router();

router.get("/", function(req, res){
    indexController.index(req,res);
});

router.post("/login", function(req, res){
    indexController.login(req,res);
});

router.get("/login", function(req, res){
    indexController.isLoggedIn(req,res);
});

router.post("/logout", function(req, res){
    indexController.logout(req,res);
});

module.exports = router;
var store = require("../services/orderStore.js");
var userService = require('../services/userStore.js');

module.exports.login = function(req, res)
{
    if(!req.session.name) {
        userService.authenticate(req.body.email, req.body.pwd, function (err, valid) {
            if(valid) {
                req.session.name  = req.body.email;
                if(req.body._backref) {
                    res.redirect(req.body._backref);
                }
                else  {
                    res.redirect("/");
                }
            }
        });
    }
    else {
        res.redirect("/");
    }
};

module.exports.logout = function(req, res)
{
    if(req.session.name) {
        req.session.name = null;
        res.redirect("/");
    }
};

module.exports.index = function(req, res)
{
    res.render("index", {isLoggedIn : !req.session.name});
};

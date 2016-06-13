var store = require("../services/orderStore.js");
var userService = require('../services/userStore.js');
var util = require('../util/security');


module.exports.login = function(req, res) {
    util.handleLogin(req, res);
};

module.exports.isLoggedIn = function(req, res) {
    res.json(util.isLoggedIn(req, res));
};

module.exports.logout = function(req, res)
{
    util.clearLogin(req);

    res.format({
        'text/html': function () {
            res.redirect("/");
        },
        'application/json': function () {
            res.send(true);
        }
    });
};

module.exports.index = function(req, res)
{
    res.render("index", {isLoggedIn : !req.session.name});
};

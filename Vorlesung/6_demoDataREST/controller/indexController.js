const store = require("../services/orderStore.js");
const userService = require('../services/userStore.js');
const util = require('../util/security');


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
    res.render("index", {isLoggedIn : util.isLoggedIn(req)});
};

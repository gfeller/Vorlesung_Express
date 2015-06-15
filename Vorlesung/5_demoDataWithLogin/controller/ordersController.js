var store = require("../services/orderStore.js");
var util = require("../util/security");

module.exports.showIndex = function(req, res)
{
    res.render("index");
};

module.exports.createOrder = function(req, res)
{
    res.render("newOrder");
};

module.exports.createPizza = function(req, res)
{
    var order = store.add(req.body.name, util.current(req), function(err, order) {
        res.render("succeeded", order);
    });
};

module.exports.showOrder = function(req, res)
{
    store.get(req.params.id, function(err, order) {
         res.render("showorder", order);
    });
};

module.exports.deleteOrder =  function (req, res)
{
    store.delete(  req.params.id , function(err, order) {
        res.render("showorder", order);
    });
};

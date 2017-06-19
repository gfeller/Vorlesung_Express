const store = require("../services/orderStore.js");
const util = require("../util/security");


module.exports.getOrders = function(req, res)
{
    store.all(util.current(req), function (err, orders) {
        res.json(orders || {});
    })
};

module.exports.createPizza = function(req, res)
{
    let order = store.add(req.body.name, util.current(req), function(err, order) {
        res.json(order);
    });
};

module.exports.showOrder = function(req, res){
    store.get(req.params.id, util.current(req), function(err, order) {
        res.json(order);
    });
};

module.exports.deleteOrder =  function (req, res)
{
    store.delete(  req.params.id, util.current(req), function(err, order) {
        res.json(order);
    });
};

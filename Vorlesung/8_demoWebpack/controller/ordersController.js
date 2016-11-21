var store = require("../services/orderStore.js");
var util = require("../util/security");


module.exports.createPizza = function(req, res)
{
    var order = store.add(req.body.name, util.current(req), function(err, order) {
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

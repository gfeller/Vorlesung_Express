var store = require("../services/orderStore.js");
var util = require("../util/security");


module.exports.showIndex = function(req, res){
    res.format({
        'text/html': function(){
            res.render("index");
        },
        'application/json': function(){
            res.send({});
        }
    });
};

module.exports.createOrder = function(req, res)
{
    res.format({
        'text/html': function(){
            res.render("newOrder");
        },
        'application/json': function(){
            res.send({});
        }
    });

};

module.exports.createPizza = function(req, res)
{
    var order = store.add(req.body.name, util.current(req), function(err, order) {
        res.format({
            'text/html': function(){
                res.render("succeeded", order);
            },
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showOrder = function(req, res)
{
    store.get(req.params.id, util.current(req), function(err, order) {
        res.format({
            'text/html': function(){
                res.render("showorder", order);
            },
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.deleteOrder =  function (req, res)
{
    store.delete(  req.params.id, util.current(req), function(err, order) {
        res.format({
            'text/html': function(){
                res.render("showorder", order);
            },
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

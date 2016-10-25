var Datastore = require('nedb');
var db = new Datastore({ filename: './data/order.db', autoload: true });

function Order(pizzaName, orderedBy)
{
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = JSON.stringify(new Date());
    this.state = "OK";
}


function publicAddOrder(pizzaName, orderedBy, callback)
{
    var order = new Order(pizzaName, orderedBy);
    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, currentUser, callback) {
    db.update({_id: id, orderedBy : currentUser}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(id,currentUser, callback);
    });
}

function publicGet(id, currentUser, callback)
{
    db.findOne({ _id: id, orderedBy : currentUser }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddOrder, delete : publicRemove, get : publicGet, all : publicAll};
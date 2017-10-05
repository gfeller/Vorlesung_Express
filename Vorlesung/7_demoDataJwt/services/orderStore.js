const Datastore = require('nedb');
const db = new Datastore({ filename: './data/order.db', autoload: true });

function Order(pizzaName, orderedBy)
{
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = new Date();
    this.state = "OK";
}


function publicAddOrder(pizzaName, orderedBy, callback)
{
    let order = new Order(pizzaName, orderedBy);
    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, currentUser, callback) {
    db.update({_id: id, orderedBy : currentUser}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, count, doc) {
        callback(err, doc);
    });
}

function publicGet(id, currentUser, callback)
{
    db.findOne({ _id: id, orderedBy : currentUser }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(currentUser, callback)
{
    db.find({orderedBy : currentUser}).sort({ orderDate: -1 }).exec(function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddOrder, delete : publicRemove, get : publicGet, all : publicAll};
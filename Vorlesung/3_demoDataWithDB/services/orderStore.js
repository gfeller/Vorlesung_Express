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
    console.log("  publicAddOrder start");
    let order = new Order(pizzaName, orderedBy);
    db.insert(order, function(err, newDoc){
        console.log("    insert");
        if(callback){
            callback(err, newDoc);
        }
    });
    console.log("  publicAddOrder end");
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
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
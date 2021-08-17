import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/order.db', autoload: true});

class Order {
    constructor(pizzaName, orderedBy) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}


class OrderStore {
    constructor() {

    }

    add(pizzaName, orderedBy, callback) {
        console.log("  publicAddOrder start");
        let order = new Order(pizzaName, orderedBy);
        db.insert(order, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
        console.log("  publicAddOrder end");
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const orderStore = new OrderStore();

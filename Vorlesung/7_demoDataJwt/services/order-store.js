import Datastore from 'nedb-promises'

export class Order {
    constructor(pizzaName, orderedBy) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

export class OrderStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/orders.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(pizzaName, orderedBy) {
        let order = new Order(pizzaName, orderedBy);
        return this.db.insert(order);
    }

    async delete(id, currentUser) {
        await this.db.update({_id: id, orderedBy: currentUser}, {$set: {"state": "DELETED"}});
        return this.get(id, currentUser);
    }

    async get(id, currentUser) {
        return this.db.findOne({_id: id, orderedBy : currentUser});
    }

    async all(currentUser) {
        return this.db.find({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
    }
}

export const orderStore = new OrderStore();

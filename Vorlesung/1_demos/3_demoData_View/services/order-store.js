import Datastore from '@seald-io/nedb'
import {CONFIG} from "../../2_demoView/config.js";

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
        this.db = db || new Datastore({filename: CONFIG.data("orders.db"), autoload: true});
    }

    async add(pizzaName, orderedBy) {
        let order = new Order(pizzaName, orderedBy);
        const storedOrder = await this.db.insertAsync(order);
        console.log(order._id, storedOrder._id);
        return storedOrder;
    }

    async delete(id) {
        await this.db.updateAsync({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
        return this.db.findOneAsync({ _id: id });
    }

    async all() {
        return this.db.findAsync({});
    }
}

export const orderStore = new OrderStore();

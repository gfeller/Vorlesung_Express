import Datastore from '@seald-io/nedb'

enum OrderState{
    OK = "OK",
    DELETED = "DELETED"
}

export class Order {
    orderedBy: string;
    orderDate: Date;
    pizzaName: string;
    state: OrderState;
    constructor(pizzaName: string, orderedBy: string) {
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = OrderState.OK;
    }
}

export class OrderStore {
    private db: Datastore<Order>;

    constructor(db?: Datastore<Order>) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/orders.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(pizzaName: string, orderedBy: string) {
        const order = new Order(pizzaName, orderedBy);
        return this.db.insertAsync(order);
    }

    async delete(id: string) {
        await this.db.updateAsync({_id: id}, {$set: {"state": OrderState.DELETED}});
        const order = await this.get(id);
        return order!;
    }

    async get(id: string) {
        return this.db.findOneAsync<Order>({_id: id});
    }

    async all() {
        return this.db.find({});
    }
}

export const orderStore = new OrderStore();

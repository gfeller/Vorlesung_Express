export class Order {
    constructor(pizzaName = "Hawaii", orderedBy = "unkown", id = 1, state = "OK") {
        this._id = id;
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = state
    }
}


export class OrdersController {
    showIndex = (req, res) => {
        res.render("index");
    };

    createOrder = (req, res) => {
        res.render("newOrder");
    };

    createPizza = async (req, res) => {
        res.render("succeeded", new Order(req.body.name, undefined));
    };

    showOrder = async (req, res) => {
        res.render("showorder", new Order(undefined, undefined, req.params.id));
    };

    deleteOrder = async (req, res) => {
        res.render("showorder",  new Order(undefined, undefined, req.params.id, "DELETED"));
    };

}
export const ordersController = new OrdersController();

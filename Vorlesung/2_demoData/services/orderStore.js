var orders = [];

function Order(pizzaName, orderedBy)
{
    this.id = orders.length;
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = JSON.stringify(new Date());
    this.state = "OK";
}


function publicAddOrder(pizzaName, orderedBy)
{
    var order = new Order(pizzaName, orderedBy);
    orders.push(order);
    return order;
}

function publicRemove(id)
{
    var order = publicGet(id);
    if(order)
    {
        order.state = "DELETED";
    }
    return order;
}

function publicGet(id)
{
    return orders[id];
}

function publicAll()
{
    return orders;
}

module.exports = {add : publicAddOrder, delete : publicRemove, get : publicGet, all : publicAll};
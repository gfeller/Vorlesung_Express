import {httpService} from './http-service.js'

class OrderService {
    async createPizza(pizzeName) {
        const query = `mutation{
                          addOrder(input: {pizzaName: "${pizzeName}"}) {
                            _id
                          }
                        }`;
        return httpService.ajax(query);
    }

    async getOrders() {
        const query = `{
                          Orders{
                            _id,
                            pizzaName,
                            orderDate,
                            state,
                            owner{
                              email
                            }
                          }
                        }`;
        return (await httpService.ajax(query)).Orders;
    }

    async getOrder(id) {
        const query = `query{
                          Order(id: "${id}"){
                            _id,
                            pizzaName,
                            orderDate,
                            state
                          }
                        }`;
        return (await httpService.ajax(query)).Order;
    }

    async deleteOrder(id) {
        const query = `mutation{
          deleteOrder(id: "${id}"){
            _id
          }
        }`;
        return httpService.ajax(query);
    }
}

export const orderService = new OrderService();

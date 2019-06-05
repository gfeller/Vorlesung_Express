import { httpService } from './http-service.js'

class OrderService {    
    async createPizza(pizzeName) {
        return await httpService.ajax("POST", "/orders/", { name: pizzeName });
    }

    async getOrders() {
        return await httpService.ajax("GET", "/orders/", undefined);
    }

    async getOrder(id) {
        return await httpService.ajax("GET", `/orders/${id}`, undefined);
    }

    async deleteOrder(id) {
        return await httpService.ajax("DELETE", `/orders/${id}`, undefined);
    }
}

export const orderService = new OrderService();
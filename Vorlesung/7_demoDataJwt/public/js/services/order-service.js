import { httpService } from './http-service.js'

class OrderService {
    async createPizza(pizzeName) {
        return httpService.ajax("POST", "/orders/", { name: pizzeName });
    }

    async getOrders() {
        return httpService.ajax("GET", "/orders/", undefined);
    }

    async getOrder(id) {
        return httpService.ajax("GET", `/orders/${id}`, undefined);
    }

    async deleteOrder(id) {
        return httpService.ajax("DELETE", `/orders/${id}`, undefined);
    }
}

export const orderService = new OrderService();

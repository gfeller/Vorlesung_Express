import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'

import {SUT} from './utils/sut.js';

let sut = new SUT();

describe('Scenarios', () => {
    beforeEach(async () => {
        await sut.init();
    })

    it('Order a pizza', async () => {
        await createAnonymousOrder();
        const order = await createOrder();
        await deleteWithDifferentUser(order);
        await deleteWithSameUser(order);
    });


    async function createAnonymousOrder() {
        const response = await request(sut.app).post('/orders');
        expect(response.status).toBe(401);
    }

    async function createOrder() {
        const response = await sut.addToken(request(sut.app).post('/orders'), sut.tokenUser1, {name: 'Hawaii'});

        expect(response.status).toBe(200);
        const order = response.body;
        expect(order.pizzaName).toBe("Hawaii");
        return order;
    }

    async function deleteWithDifferentUser(order) {
        const response = await sut.addToken(request(sut.app).delete(`/orders/${order._id}`), sut.tokenUser2);
        expect(response.body).toBeNull();
    }

    async function deleteWithSameUser(order) {
        const response = await sut.addToken(request(sut.app).delete(`/orders/${order._id}`), sut.tokenUser1);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.state).toBe("DELETED");
    }
});

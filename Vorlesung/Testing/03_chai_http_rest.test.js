import chai from 'chai';
import chaiHttp from 'chai-http';

import {SUT} from './utils/sut.js';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect

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
        const response = await chai.request(sut.app).post('/orders');
        response.should.have.status(401);
    }

    async function createOrder() {
        const response = await sut.addToken(chai.request(sut.app).post('/orders'), sut.tokenUser1, {name: 'Hawaii'});

        response.should.have.status(200);
        const order = response.body;
        expect(order.pizzaName).to.equal("Hawaii");
        return order;
    }

    async function deleteWithDifferentUser(order) {
        const response = await sut.addToken(chai.request(sut.app).delete(`/orders/${order._id}`), sut.tokenUser2);
        expect(response.body).to.be.null;
    }

    async function deleteWithSameUser(order) {
        const response = await sut.addToken(chai.request(sut.app).delete(`/orders/${order._id}`), sut.tokenUser1);

        response.should.have.status(200);
        expect(response.body).to.be.not.null;
        expect(response.body.state).to.equal("DELETED");
    }
});



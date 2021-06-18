import chai from 'chai';
import chaiHttp from 'chai-http';

import {app} from '../7_demoDataJwt/app.js';
import {SUT} from './utils/sut.js';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect

let sut = new SUT(app);

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
        const response = await chai.request(app).post('/orders');
        response.should.have.status(401);
    }

    async function createOrder() {
        const response = await chai.request(app).post('/orders')
            .set('authorization', `Bearer ${sut.tokenUser1}`)
            .send({name: 'Hawaii'});

        response.should.have.status(200);
        const order = response.body;
        expect(order.pizzaName).to.equal("Hawaii");
        return order;
    }

    async function deleteWithDifferentUser(order) {
        const response = await chai.request(app).delete(`/orders/${order._id}`)
            .set('authorization', `Bearer ${sut.tokenUser2}`)
            .send();

        response.should.have.status(200);
        expect(response.body).to.be.null;
    }

    async function deleteWithSameUser(order) {
        const response = await chai.request(app).delete(`/orders/${order._id}`)
            .set('authorization', `Bearer ${sut.tokenUser1}`)
            .send();

        response.should.have.status(200);
        expect(response.body).to.be.not.null;
        expect(response.body.state).to.equal("DELETED");
    }
});



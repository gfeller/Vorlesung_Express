import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../7_demoDataJwt/index.js';

chai.use(chaiHttp);
chai.should();
describe('GET /', () => {
    it('should return hello world', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);
        response.should.have.property("text", "Hello World")

        // possible: response.should.have.status(200).and.have.property("text", "Hello World");
    });
});

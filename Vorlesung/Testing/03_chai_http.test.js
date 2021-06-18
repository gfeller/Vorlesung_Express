import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './utils/03_chai_http_app.js'; // express app

const assert = chai.assert;

chai.use(chaiHttp);
chai.should();
describe('GET /', () => {
    it('should return hello world', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);
        response.should.have.property("text", "Hello World")

        // possible: assert.equal(response.status, 200, "status code should be OK");
        // possible: response.should.have.status(200).and.have.property("text", "Hello World");
    });
});

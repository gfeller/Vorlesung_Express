import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import {app} from '../app.js';

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;

describe('GET /', () => {
    it('should return index page', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        dom.window.document.querySelector("form").should.have.attribute('action', '/login')
        expect(dom.window.document.querySelector("form")).have.attribute('action', '/login')
    });

    it('login', async () => {
        const server = chai.request.agent(app);
        const response = await server.post('/login').type('form').send({email: 'michael.gfeller@ost.ch', pwd: '1234'});
        const dom = new jsdom.JSDOM(response.text);

        dom.window.document.querySelector("form[action='/orders']").should.not.be.null;
        server.close();
    });
});

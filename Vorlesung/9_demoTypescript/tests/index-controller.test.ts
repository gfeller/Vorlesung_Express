import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;

describe('INDEX Controller', () => {
    it('should return login page if not logged in', async () => {
        const response = await chai.request(app).get('/orders');
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

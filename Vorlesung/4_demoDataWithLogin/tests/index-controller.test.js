import {use} from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";


let chai = use(chaiDom)
    .use(chaiHttp);

chai.should();
const {expect} = chai;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;

describe('INDEX Controller', () => {
    it('should return login page if not logged in', async () => {
        const response = await chai.request.execute(app).get('/orders');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.querySelector("form")).have.attribute('action', '/login')
    });

    it('login', async () => {
        const server = chai.request.agent(app);
        const response = await server.post('/login').type('form').send({email: 'michael.gfeller@ost.ch', pwd: '1234'});
        const dom = new jsdom.JSDOM(response.text);

        expect(dom.window.document.querySelector("form[action='/orders']")).should.not.be.null;
        server.close();
    });
});

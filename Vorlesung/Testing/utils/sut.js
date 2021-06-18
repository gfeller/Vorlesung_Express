import chai from "chai";
import dotenv from "dotenv";

process.env.NODE_ENV = "testing"

export class SUT {
    tokenUser1;
    tokenUser2;
    app;

    constructor() {
        dotenv.config({path: `utils/.env-testing`});
    }

    async init() {
        this.app = (await import('../../7_demoDataJwt/app.js')).app;

        this.tokenUser1 = await this.createToken("test-user-1@ost.ch")
        this.tokenUser2 = await this.createToken("test-user-2@ost.ch")
    }


    async createToken(email) {
        const response = await chai.request(this.app)
            .post('/login')
            .send({email: email, pwd: '1234'});

        response.should.have.status(200);
        return response.body;
    }

    async addToken(request, token, data) {
        return request.set('authorization', `Bearer ${token}`).send(data);
    }
}


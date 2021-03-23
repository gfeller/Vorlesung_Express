import chai from "chai";

export class SUT {
    tokenUser1;
    tokenUser2;
    app;

    constructor(app) {
        this.app = app;
    }

    async init() {
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
}


import request from 'supertest'
import { expect } from 'vitest'
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
        this.app = (await import('../../b_demo_javascript/5_rest_api/app.js')).app;

        this.tokenUser1 = await this.createToken("test-user-1@ost.ch")
        this.tokenUser2 = await this.createToken("test-user-2@ost.ch")
    }


    async createToken(email) {
        const response = await request(this.app)
            .post('/login')
            .send({email: email, pwd: '1234'});

        expect(response.status).toBe(200);
        return response.body;
    }

    async addToken(req, token, data) {
        return req.set('authorization', `Bearer ${token}`).send(data);
    }
}

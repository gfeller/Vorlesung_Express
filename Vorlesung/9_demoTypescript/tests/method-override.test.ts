import chai from 'chai';

import {overrideMiddleware} from '../utils/method-override';
import {Request} from "express";

const should = chai.should();
const expect = chai.expect;

declare global {
    namespace Express {
        interface Request {
            originalMethod: string;
        }
    }
}

describe('Override Middleware', () => {
    it('replace method', () => {
        const request = {
            body: {_method: "PUT", name: "michael"},
            method: "POST"
        } as Request

        overrideMiddleware(request, {} as any, () => null);

        request.method.should.be.eq("PUT");

        request.originalMethod.should.be.eq("POST");
        expect(request.body._method).to.be.undefined
    });
});

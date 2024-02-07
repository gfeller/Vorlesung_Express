import chai from 'chai';

import {overrideMiddleware} from '../utils/method-override.js';

const should = chai.should();
const expect = chai.expect;

describe('Override Middleware', () => {
    it('replace method', () => {
        const request = {
            body: {_method: "PUT", name: "michael"},
            method: "POST"
        }
        overrideMiddleware(request, {}, () => {
        });

        request.method.should.be.eq("PUT");
        request.originalMethod.should.be.eq("POST");
        expect(request.body._method).to.be.undefined
    });
});

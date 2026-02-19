import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

process.env.NODE_ENV = 'testing';
dotenv.config({ path: '.env-testing' });

// load app after env
const { app } = await import('../app.js');

describe('INDEX Controller', () => {
    it('should return login page if not logged in', async () => {
        const response = await request(app).get('/orders');
        expect(response.status).toBe(200);

        const dom = new JSDOM(response.text);
        const form = dom.window.document.querySelector('form');
        expect(form).not.toBeNull();
        expect(form.getAttribute('action')).toBe('/login');
    });

    it('login redirects to / on success', async () => {
        const agent = request.agent(app);

        const loginResponse = await agent
            .post('/login')
            .type('form')
            .send({ email: 'michael.gfeller@ost.ch', pwd: '1234' });

        expect(loginResponse.status).toBe(302);
        expect(loginResponse.headers.location).toBe('/');

        const redirectResponse = await agent.get(loginResponse.headers.location);
        expect(redirectResponse.status).toBe(200);

        const dom = new JSDOM(redirectResponse.text);
        const form = dom.window.document.querySelector("form[action='/orders']");
        expect(form).not.toBeNull();
    });
});

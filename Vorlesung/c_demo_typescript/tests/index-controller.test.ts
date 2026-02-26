import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../app';
import { CryptoUtil } from '../utils/crypto-util';
import { userStore } from '../services/user-store';

describe('INDEX Controller', () => {
    describe('POST /login', () => {

        beforeEach(async () => {
            if((await userStore.all()).length == 0) {
                await userStore.register({email: 'existing@test.com', pwd: 'correctpassword'});
                await userStore.register({email: 'emptypwd@test.com', pwd: 'somepassword'});
            }
        });

        it('should return 204 when already logged in (valid JWT provided)', async () => {
            const token = await CryptoUtil.createJWT({ email: 'loggedin@test.com' });
            const res = await request(app).post('/login')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'loggedin@test.com', pwd: 'somepassword' });

            expect(res.status).toBe(204);
        });

        it('should auto-register new user and return a JWT token', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: 'newuser@test.com', pwd: 'password123' });

            expect(res.status).toBe(200);
            expect(res.body.split(".").length).toBe(3);
        });

        it('should return 401 for wrong password', async () => {
            await request(app).post('/login').send({ email: 'existing@test.com', pwd: 'correctpassword' });

            const res = await request(app)
                .post('/login')
                .send({ email: 'existing@test.com', pwd: 'wrongpassword' });

            expect(res.status).toBe(401);
        });

        it('should return 400 when email is not a valid email address', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: 'notanemail', pwd: 'password123' });
            expect(res.status).toBe(400);
        });

        it('should return 400 when email is missing', async () => {
            const res = await request(app)
                .post('/login')
                .send({ pwd: 'password123' });
            expect(res.status).toBe(400);
        });

        it('should return 400 when pwd is missing', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: 'user@test.com' });
            expect(res.status).toBe(400);
        });

        it('should return 401 when pwd is empty', async () => {
            await request(app)
                .post('/login')
                .send({ email: 'emptypwd@test.com', pwd: 'somepassword' });

            const res = await request(app)
                .post('/login')
                .send({ email: 'emptypwd@test.com', pwd: '' });
            expect(res.status).toBe(401);
        });
    });
});

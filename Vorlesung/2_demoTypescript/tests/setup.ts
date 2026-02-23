import dotenv from 'dotenv';

process.env.NODE_ENV = 'testing';
dotenv.config({ path: '.env-testing' });

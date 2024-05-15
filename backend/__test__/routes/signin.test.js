import { MongoMemoryServer } from 'mongodb-memory-server';
import Request from 'supertest';

import DB from '../../models/index.js';
import app from '../../app.js';

const route = '/auth/signin';

const requests = {
    signin: () => Request(app).post(route).send({
        email: 'user@gmail.com',
        password: 'passwordsecret'
    }),

    emailRequired: () => Request(app).post(route).send({
        password: 'passwordsecret'
    }),
    passwordRequired: () => Request(app).post(route).send({
        email: 'test@gmail.com'
    }),
    passwordCorrect: () => Request(app).post(route).send({
        email: 'user@gmail.com',
        password: 'incorrectsecret'
    })
};

let mongoDBServer;
beforeAll(async () => {
    mongoDBServer = await MongoMemoryServer.create();
    const mongoUri = mongoDBServer.getUri();

    DB.connect(mongoUri);
    process.env.JWT_EXPIRE = 86400

    process.env.JWT_SECRET = 'secret'
});

afterAll(async () => {
    await mongoDBServer.stop();
    DB.disconnect();
});

describe('Singin route', () => {
    let responses;

    beforeAll(async () => {
        await DB.user.create({
            fullname: 'test',
            email: 'user@gmail.com',
            password: 'passwordsecret'
        });
        responses = await Promise.allSettled(Object.values(requests).map(req => req()));
    });


    test('It should signin the user', () => {
        const res = responses[0];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body.error).toBe(null);
    });

    test('Email should be required', () => {
        const res = responses[1];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(400);
        expect(body.success).toBe(false);
        expect(body.data).toBe(null)
        expect(body.error).toContain('No email address provided');
    });

    test('Password should be required', () => {
        const res = responses[2];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(400);
        expect(body.success).toBe(false);
        expect(body.data).toBe(null)
        expect(body.error).toContain('No password provided');
    });

    test('Password should be correct', () => {
        const res = responses[3];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(403);
        expect(body.success).toBe(false);
        expect(body.data).toBe(null)
        expect(body.error).toContain('Incorrect Password');
    });
});
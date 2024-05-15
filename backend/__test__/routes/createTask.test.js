import { MongoMemoryServer } from 'mongodb-memory-server';
import Request from 'supertest';

import DB from '../../models/index.js';
import app from '../../app.js'

const route = '/task';

const requests = {
    createTask: () => Request(app).post(route).send({
        title: 'title',
        description: 'task description',
    }),
    titleRequired: () => Request(app).post(route).send({
        description: 'task description',
    }),
    descriptionRequired: () => Request(app).post(route).send({
        title: 'title',
    }),
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

describe('Create task route', () => {
    let responses;
    beforeAll(async () => {
        responses = await Promise.allSettled(Object.values(requests).map(req => req()));
    });

    test('It should create a new task', () => {
        const res = responses[0];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(201);
        expect(body.success).toBe(true);
        expect(body.data.message).toBe('task created');
        expect(body.error).toBe(null);
    });

    test('Title should be required', () => {
        const res = responses[1];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(400);
        expect(body.success).toBe(false);
        expect(body.error).toContain('Task title is required');
        expect(body.data).toBe(null);
    });

    test('Description should be required', () => {
        const res = responses[2];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(400);
        expect(body.success).toBe(false);
        expect(body.error).toContain('Task description is required');
        expect(body.data).toBe(null);
    });
});

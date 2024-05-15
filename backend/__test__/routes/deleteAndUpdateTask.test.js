import { MongoMemoryServer } from 'mongodb-memory-server';
import Request from 'supertest';

import DB from '../../models/index.js';
import app from '../../app.js'

const route = '/task';

const requests = {
    deleteTask: (token, id) => Request(app).delete(route)
        .set('Cookie', `token=${token}`).send({
            taskId: id
        }),
    updateTask: (token, id) => Request(app).put(route)
        .set('Cookie', `token=${token}`).send({
            taskId: id,
            updatedTask: {
                title: 'updated title',
                description: 'updated description',
            }
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

describe('Delete task route', () => {
    let responses;
    beforeAll(async () => {
        const user = await DB.user.create({
            fullname: 'test',
            email: 'user@gmail.com',
            password: 'passwordsecret'
        });
        const task = await DB.task.create({
            title: 'title',
            description: 'task description',
        });

        user.tasks.push(task.id);
        await user.save();

        const token = user.getJwtToken();
        responses = await Promise.allSettled(
            Object.values(requests).map(req => req(token, task.id))
        );
    });

    test('It should delete a task', async () => {
        const res = responses[0];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data.message).toBe('task deleted');
        expect(body.error).toBe(null);
    });

    test('It should update a task', async () => {
        const res = responses[1];
        const { statusCode, body } = res.value;

        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data.message).toBe('task updated');
        expect(body.error).toBe(null);
    });
});
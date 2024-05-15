import request from 'supertest';
import app from '../app';

describe('User API', () => {
    it('should return list of users', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

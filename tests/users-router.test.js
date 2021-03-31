import 'regenerator-runtime/runtime';
const request = require('supertest')
const app = require('../app').default

describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(app).get('/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: 'test@com.x'
                })
            ])
        )
    }),
    it('should show a user', async () => {
        const res = await request(app).get('/users/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('email', 'test@com.x')
    }),
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                email: 'bob@doe.com',
                password: '12345678'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('email', 'bob@doe.com')
    }),
    it('should update a user', async () => {
        const res = await request(app)
            .put('/users/4')
            .send({
                email: 'bob@doe.com',
                password: 'abc123'
            })
        expect(res.statusCode).toEqual(202)
        expect(res.body).toHaveProperty('message', 'User updated')
    }),
    it('should delete a user', async () => {
        const res = await request(app)
            .del('/users/4')
        expect(res.statusCode).toEqual(204)
    })
})
import 'regenerator-runtime/runtime';
const request = require('supertest')
const app = require('../app').default

describe('workspaces API', () => {
    it('should show a workspaces', async () => {
        const res = await request(app).get('/workspaces/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name', 'Cleison')
    }),
    it('should create a new workspaces', async () => {
        const res = await request(app)
            .post('/workspaces')
            .send({
                name: 'Isaac',
                access: 1
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name', 'Isaac')
    }),
    it('should update a workspaces', async () => {
        const res = await request(app)
            .put('/workspaces/2')
            .send({
                name: 'Isaac',
                access: 3
            })
        expect(res.statusCode).toEqual(202)
        expect(res.body).toHaveProperty('message', 'Workspace updated')
    }),
    it('should delete a workspaces', async () => {
        const res = await request(app)
            .del('/workspaces/2')
        expect(res.statusCode).toEqual(204)
    })
})
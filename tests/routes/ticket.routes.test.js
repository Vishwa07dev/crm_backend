const request = require('supertest');

const User = require('../../models/user.model');
const app = require("../../server");
var jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");
const client = require("../../utils/NotificationClient").client;

const db = require('../db')
beforeAll(async () => {
    await db.clearDatabase();
    await User.create({
        name: "Vishwa",
        userId: 1, // It should be atleat 16, else will throw error
        email: "Kankvish@gmail.com",  // If we don't pass this, it will throw the error
        userType: "ENGINEER",
        password :"Welcome1",
        userStatus: "APPROVED"

    });
    
})
afterAll(async () => {
    await db.closeDatabase();
    app.close();
})

const api_endpoint = "/crm/api/v1/";

const ticketTestPayload ={
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    assignee: 1
}
let updateId;

describe('Post Tickets Endpoints', () => {
    jest.spyOn(client,'post').mockImplementation((url, args, cb) => cb("Test", null));

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should create', async () => {
        const res = await request(app)
            .post(api_endpoint + 'tickets/')
            .set("x-access-token", token)
            .send(ticketTestPayload);
        id = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({ 
                "assignee": 1,
                "description": "Test",
                "reporter": 1,
                "status": "OPEN",
                "ticketPriority": 4,
                "title": "Test",
            })
        );
    })
})

describe('Put Tickets Endpoints', () => {
    jest.spyOn(client,'post').mockImplementation((url, args, cb) => cb("Test", null));

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should update', async () => {
        const res = await request(app)
            .put(api_endpoint + 'tickets/' + id)
            .set("x-access-token", token)
            .send(ticketTestPayload);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({ 
                "assignee": 1,
                "description": "Test",
                "reporter": 1,
                "status": "OPEN",
                "ticketPriority": 4,
                "title": "Test",
            })
        );
    })
})

describe('Get All Tickets Endpoints', () => {
    jest.spyOn(client,'post').mockImplementation((url, args, cb) => cb("Test", null));

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should get all', async () => {
        const res = await request(app)
            .get(api_endpoint + 'tickets')
            .set("x-access-token", token)
            .send(ticketTestPayload);
        updateId = res.body[0].id;
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ 
                    "assignee": 1,
                    "description": "Test",
                    "reporter": 1,
                    "status": "OPEN",
                    "ticketPriority": 4,
                    "title": "Test",
                })
            ])
        );
    })
})

describe('Get One Tickets Endpoints', () => {
    jest.spyOn(client,'post').mockImplementation((url, args, cb) => cb("Test", null));

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should get one', async () => {
        const res = await request(app)
            .get(api_endpoint + 'tickets/' + updateId)
            .set("x-access-token", token)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({ 
                "assignee": 1,
                "description": "Test",
                "reporter": 1,
                "status": "OPEN",
                "ticketPriority": 4,
                "title": "Test",
            })
        );
    })
})
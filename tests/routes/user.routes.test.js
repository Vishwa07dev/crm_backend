const request = require('supertest');

const User = require('../../models/user.model');
const app = require("../../server");
var jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");

const db = require('../db')
beforeAll(async () => {
    await db.clearDatabase();
    await User.create({
        name: "Vishwa",
        userId: 1, // It should be atleat 16, else will throw error
        email: "Kankvish@gmail.com",  // If we don't pass this, it will throw the error
        userType: "ADMIN",
        password :"Welcome1",
        userStatus: "APPROVED"

    });
    
})
afterAll(async () => {
    await db.closeDatabase();
    app.close();
})

const api_endpoint = "/crm/api/v1/";

describe('Find By Id Endpoints', () => {

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should find by id', async () => {
        const res = await request(app)
            .get(api_endpoint + 'users/1')
            .set("x-access-token", token)
            .field("userId",1)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "email": "kankvish@gmail.com",
                    "name": "Vishwa", 
                    "userId": "1", 
                    "userStatus": "APPROVED", 
                    "userType": "ADMIN"})
            ])
        );
    })
})

describe('Find All Endpoints', () => {

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should Find All', async () => {
        const res = await request(app)
            .get(api_endpoint + 'users')
            .set("x-access-token", token)
            .query({userType:"ADMIN"})
            .field("userId",1)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "email": "kankvish@gmail.com",
                    "name": "Vishwa", 
                    "userId": "1", 
                    "userStatus": "APPROVED", 
                    "userType": "ADMIN"})
            ])
        );
    })
})

describe('PUT Update Endpoints', () => {

    var token = jwt.sign({ id: 1 }, config.secret, {
        expiresIn: 120 // 2 minutes
      });
    it('should Update', async () => {
        const res = await request(app)
            .put(api_endpoint + 'users/1')
            .set("x-access-token", token)
            .field("userType","ADMIN")
            .field("userId",1)
        console.log(res.error)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            "message": "User record has been updated successfully"
        });
    })
})
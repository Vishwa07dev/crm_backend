const {mockRequest, mockResponse} = require("../interceptor")
const {findAll, findById, update} = require('../../controllers/user.controller')
const User = require("../../models/user.model");

const userTestPayload = {
    userType:"CUSTOMER",
    password:"12345678",
    userStatus: "APPROVED",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    ticketsCreated: [],
    ticketsAssigned: [],
    exec: jest.fn()
}

describe('Update', () => {
    it('should pass', async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>({
            exec: jest.fn().mockReturnValue(userTestPayload)
        }))
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        req.body = userTestPayload;
        await update(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message: `User record has been updated successfully`
        });
    })
    it('should fail', async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockReturnValue(cb => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await update(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
})

describe('FindAll', () => {
    it("should pass", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userStatus", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userStatus: "APPROVED"}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userType", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userType: "CUSTOMER"}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userType and Status", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userType: "CUSTOMER",
            userStatus: "APPROVED"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with name", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {name: "test"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should fail", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userStatus", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userStatus: "APPROVED"}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userType", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userType: "CUSTOMER"}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userType and Status", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {userType: "CUSTOMER",
            userStatus: "APPROVED"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with name", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {name: "test"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
})

describe('Find By Id', () => {
    it("should pass", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await findById(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userType:"CUSTOMER",
                    name: "Test",
                    userId: 1,
                    email: "test@relevel.com",
                    userStatus: "APPROVED"
                })
            ])
        );
    })
    it("should pass without data", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve(null));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await findById(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message: `User with this id [1] is not present`
        });
    })
})
const {mockRequest, mockResponse} = require("../interceptor")
const verifyTicketRequestBody = require("../../middlewares/verifyTicketReqBody.js")

const ticketTestPayload ={
    ticketPriority: 4,
    status: "OPENED",
    assignee: 1
}

describe('validateTicketStatus', () => {
    it("should fail", async () =>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = ticketTestPayload;
        req.userId = 1;
        await validateTicketStatus(req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: "status provided is invalid. Possible values CLOSED | BLOCKED | IN_PROGESS | OPEN "
        });
    })
})


describe('validateTicketStatus', () => {
    it("should fail due to title", async () =>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = ticketTestPayload;
        req.userId = 1;
        await validateTicketRequestBody(req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: "Failed! Title is not provided !"
        });
    })
    it("should fail due to description", async () =>{
        const req = mockRequest();
        const res = mockResponse();
        ticketTestPayload.title = "Test";
        req.body = ticketTestPayload;
        req.userId = 1;
        await validateTicketRequestBody(req, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: "Failed! Description is not provided !"
        });
    })
})
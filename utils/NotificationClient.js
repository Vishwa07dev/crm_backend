var Client = require('node-rest-client').Client;

var client = new Client();

exports.client = client;
exports.sendEmail = (ticketId, subject, content, emailIds, requester) => {
    var reqBody = {
        subject: subject,
        content: content,
        recepientEmails: emailIds,
        requester: requester,
        ticketId: ticketId
    }
    var args = {
        data: reqBody,
        headers: { "Content-Type": "application/json" }
    };
    /**
     * We can keep this hardcoded URL in the configs files
     */
    client.post("http://localhost:7777/notifiServ/api/v1/notifications", args, function (data, response) {
        console.log("Request sent");
        console.log(data);
    });


}

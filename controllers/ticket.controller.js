
/**
 * This is the controller for the ticket resource
 */
const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const constants = require("../utils/constants");
const objectConvertor = require("../utils/objectConcverter");


/**
 * Create a ticket :
 *   As soon as ticket is created, it will be assigned an Engineer if present
 */
exports.createTicket = async (req, res) => {

    const ticketObject = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId //this will be retrieved from the middleware
    }

    /**
     * Logic to find an Engineer in the Approved state 
     */
    const engineer = await User.findOne({
        userType: constants.userTypes.engineer,
        userStatus: constants.userStatus.approved
    });
    ticketObject.assignee = engineer.userId;

    try {
        const ticket = await Ticket.create(ticketObject);

        if (ticket) {
            //Updating the customer
            const user = await User.findOne({
                userId: req.userId
            });
            user.ticketsCreated.push(ticket._id);
            await user.save();

            //Updating the Engineer
            engineer.ticketsAssigned.push(ticket._id);
            await engineer.save();


            res.status(201).send(objectConvertor.ticketResponse(ticket));
        }
    } catch (err) {
        console.log("Some error happened while creating ticket", err.message);
        res.status(500).send({
            message: "Some internal server error"
        }
        )
    }

};




/**
 * Update the ticket 
 * 
 * Only the user who has created the ticket should be allowed to update the ticket
 */
exports.updateTicket = async (req, res) => {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (ticket.reporter == req.userId) {
        //Allowed to update
        ticket.title = req.body.title != undefined ? req.body.title : ticket.title,
            ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
            ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
            ticket.status = req.body.status != undefined ? req.body.status : ticket.status

        var updatedTicket = await ticket.save();
        res.status(200).send(objectConvertor.ticketResponse(updatedTicket));
    } else {
        console.log("Ticket was being updated by someone who has not created the ticket");
        res.status(401).send({
            message: "Ticket can be updated only by the customer who created it"
        })
    }

};

/**
 * Get the list of all the tickets created by me
 */
exports.getAllTickets = async (req, res) => {

    const queryObj = {
        reporter: req.userId
    }

    if (req.query.status != undefined) {
        queryObj.status = req.query.status;
    }


    const tickets = await Ticket.find(queryObj);
    res.status(200).send(objectConvertor.ticketListResponse(tickets));
}

/**
 * Get the ticket based on the ticketId
 */

exports.getOneTicket = async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id
    })

    res.status(200).send(objectConvertor.ticketResponse(ticket));
}
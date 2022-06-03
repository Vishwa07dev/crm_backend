exports.userResponse = (users) => {

    usersResult = [];
    users.forEach(user => {
        usersResult.push({

            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userType,
            userStatus: user.userStatus

        });
    });
    return usersResult;

}


exports.ticketResponse = (ticket) => {
    return {
        title: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}

exports.ticketListResponse = (tickets) => {
    ticketResult = [];
    tickets.forEach(ticket =>{
        ticketResult.push({
            title: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        status: ticket.status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
        })
    });
    return ticketResult;
    
}
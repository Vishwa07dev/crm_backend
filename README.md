# CRM App backend [ Session 3 ]
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
* User Handling
    * API for creating a ticket
        * Only the authenticated user should be able to create a ticket
        * Validation of the request body
    * API to fetch all the tickets
        * Authenticated user should be able to fetch all the tickets created by him
        * Ability to filter based on the ticket status
    * API for updating the ticket
        * Only the user who created the ticket should be able to update ( support for Engineers and ADMIN will be added later)
        * Validation of the request body
    * API to fetch the ticket based on ticket id
       *  Only the authenticated user should be able to fetch the ticket based on the ticket id

  
More details around this can be found [here](https://docs.google.com/document/d/1x866VrSsjchFf7dhD7U2zYLbzj-tt34STWuDMMyL6Uc/edit?usp=sharing) 

## How is the code organized in this repo ?
The whole repo is divided into multiple branches. Each branch contains code for a specific concept. For example _session1_ has the code base for user registration and login . Each branch is built on the top of the previous branch

## Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running

## Tech
- Node.js
- Mongodb


## Installation

this app requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

Before starting the server please ensure mongodb server is locally installed and running on the default port

```sh
cd crm_backend
npm install
npm run devStart
```

## Rest endpoints
#### 1. Create a new ticket 

```sh
POST /crm/api/v1/tickets/
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
Sample request body :
{
        "title": "Not able to use the device",
        "description" : "Device is not turning on with power"
}

Sample response body :
{
    "title": "Not able to use the device",
    "ticketPriority": 4,
    "description": "Device is not turning on with power",
    "status": "OPEN",
    "reporter": "Vish01",
    "assignee": "Vish07",
    "id": "6215d8288d78a94e0a5a0610",
    "createdAt": "2022-02-23T06:46:00.414Z",
    "updatedAt": "2022-02-23T06:46:00.414Z"
}
```
--- 
#### 2. Get all tickets

```sh
GET /crm/api/v1/tickets/

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0


Sample response body :
[
    {
        "title": "Not Able to update",
        "ticketPriority": 4,
        "description": "Update functionality is not working for my device",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215c1e85e0d5a53afcd4e68",
        "createdAt": "2022-02-23T05:11:04.841Z",
        "updatedAt": "2022-02-23T05:11:04.841Z"
    },
    {
        "title": "Not able to use the device",
        "ticketPriority": 4,
        "description": "Device is not turning on with power yessss",
        "status": "CLOSED",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215ceb86ba4fcbac9433282",
        "createdAt": "2022-02-23T06:05:44.352Z",
        "updatedAt": "2022-02-23T06:05:44.353Z"
    },
    {
        "title": "Not able to use the device",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215d8288d78a94e0a5a0610",
        "createdAt": "2022-02-23T06:46:00.414Z",
        "updatedAt": "2022-02-23T06:46:00.414Z"
    }
]
```
#### 3. Get all tickets fitered by status
```sh
GET /crm/api/v1/tickets?status=OPEN

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
Response :
[
    {
        "title": "Not Able to update",
        "ticketPriority": 4,
        "description": "Update functionality is not working for my device",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215c1e85e0d5a53afcd4e68",
        "createdAt": "2022-02-23T05:11:04.841Z",
        "updatedAt": "2022-02-23T05:11:04.841Z"
    },
    {
        "title": "Not able to use the device",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215d8288d78a94e0a5a0610",
        "createdAt": "2022-02-23T06:46:00.414Z",
        "updatedAt": "2022-02-23T06:46:00.414Z"
    }
]

```

#### 4. Update the given ticket ( Only the creator of the ticket should be able to update it)
```sh
PUT /crm/api/v1/tickets/6215c1e85e0d5a53afcd4e68

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0

Request body :
{
        "title": "Not Able to update",
        "ticketPriority": 4,
        "description": "Update functionality is not working for my device",
        "status": "CLOSED"
        
}

Response body :
{
    "title": "Not Able to update",
    "ticketPriority": 4,
    "description": "Update functionality is not working for my device",
    "status": "CLOSED",
    "reporter": "Vish01",
    "assignee": "Vish07",
    "id": "6215c1e85e0d5a53afcd4e68",
    "createdAt": "2022-02-23T05:11:04.841Z",
    "updatedAt": "2022-02-23T05:11:04.841Z"
}

```

#### 5. Get the ticket based on the ticket id
```sh
GET /crm/api/v1/tickets/{id}

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
Response :
{
        "title": "Not Able to update",
        "ticketPriority": 4,
        "description": "Update functionality is not working for my device",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "6215c1e85e0d5a53afcd4e68",
        "createdAt": "2022-02-23T05:11:04.841Z",
        "updatedAt": "2022-02-23T05:11:04.841Z"
}

```
###
POSTMAN collection [link](https://www.getpostman.com/collections/9168e824f523fb659502)

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com

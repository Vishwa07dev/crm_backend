# CRM App backend [ Session 4 ]
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
* API for authenticated Engineer to update the ticket
* Updated ticket should be visible to the customers immediately
* API for authenticated Engineer to search for the ticket
* API for authenticated Engineer to be able to accept a ticket
* API for authenticated Engineer to be able to see the complete list of tickets assigned to him/her
* API for the authenticated ADMIN to get the list of all the customers
* API for the authenticated ADMIN to get the list of all the issues
* API for the authenticated ADMIN to get the list of all the issues after applying certain filters
* Admin should be able to re-assign a ticket to any other Engineer


  

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

#### 1. API for authenticated Engineer to be able to see the complete list of tickets assigned to him/her

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
        "status": "CLOSED",
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
--- 
#### 2. API for authenticated Engineer to search for the ticket

```sh
GET /crm/api/v1/tickets/{id}

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0


Sample response body :
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
#### 3. API for the authenticated Engineer to update the ticket/reassign the ticket assigned to him/her
```sh
PUT /crm/api/v1/tickets/6215c1e85e0d5a53afcd4e68

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
 
 Request :
 {
    "title": "Not Able to update",
    "ticketPriority": 4,
    "description": "Update functionality is not working for my device",
    "status": "CLOSED",
    "reporter": "Vish01",
    "assignee": "Shiv01",
    "id": "6215c1e85e0d5a53afcd4e68"

}
Response :
{
    "title": "Not Able to update",
    "ticketPriority": 4,
    "description": "Update functionality is not working for my device",
    "status": "CLOSED",
    "reporter": "Vish01",
    "assignee": "Shiv01",
    "id": "6215c1e85e0d5a53afcd4e68",
    "createdAt": "2022-02-23T05:11:04.841Z",
    "updatedAt": "2022-02-23T05:11:04.841Z"
}

```

#### 4. API for the authenticated ADMIN to get the list of all the issues
```sh
GET /crm/api/v1/tickets/

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0



Response body :
[
    {
        "title": "Not Able to update",
        "ticketPriority": 4,
        "description": "Update functionality is not working for my device",
        "status": "CLOSED",
        "reporter": "Vish01",
        "assignee": "Shiv01",
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
    },
    {
        "title": "Not able to use the device again",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "62270ca27db35f99978ac346",
        "createdAt": "2022-03-08T07:58:26.362Z",
        "updatedAt": "2022-03-08T07:58:26.362Z"
    },
    {
        "title": "Not able to use the device again",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish02",
        "assignee": "Vish07",
        "id": "6227127436d167dde19c2a3b",
        "createdAt": "2022-03-08T08:23:16.902Z",
        "updatedAt": "2022-03-08T08:23:16.903Z"
    }
]

```

#### 5. API for the authenticated ADMIN to get the list of all the issues based on filters
```sh
GET /crm/api/v1/tickets?status=OPEN

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
Response :
[
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
    },
    {
        "title": "Not able to use the device again",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish01",
        "assignee": "Vish07",
        "id": "62270ca27db35f99978ac346",
        "createdAt": "2022-03-08T07:58:26.362Z",
        "updatedAt": "2022-03-08T07:58:26.362Z"
    },
    {
        "title": "Not able to use the device again",
        "ticketPriority": 4,
        "description": "Device is not turning on with power",
        "status": "OPEN",
        "reporter": "Vish02",
        "assignee": "Vish07",
        "id": "6227127436d167dde19c2a3b",
        "createdAt": "2022-03-08T08:23:16.902Z",
        "updatedAt": "2022-03-08T08:23:16.903Z"
    }
]

```
###

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com

# CRM App backend [ Session 2 ]
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
* User Handling
    * API for getting the list of all users
    * EAPI for the gettig the user based on UserID
    * API for updating the user type and status
    * Authenticaing and Authorizing above APIs, so that only authenticated ADMIN user will be allowed to perform the above operations
    * ENGINEER/ADMIN user should be able to login successfully after the approval from ADMIN user
  
    
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
#### 1. Get all users 

```sh
GET /crm/api/v1/users/
Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0
Sample request body :


Sample response body :
[
    {
        "name": "Vishwa",
        "userId": "admin",
        "email": "kankvish@gmail.com",
        "userTypes": "ADMIN",
        "userStatus": "APPROVED"
    },
    {
        "name": "Vishwa",
        "userId": "Vish01",
        "email": "abc@xyz1.com",
        "userTypes": "ENGINEER",
        "userStatus": "APPROVED"
    },
    {
        "name": "Mohan",
        "userId": "Mohan01",
        "email": "abc@mohan.com",
        "userTypes": "CUSTOMER",
        "userStatus": "APPROVED"
    }
]
```
Details about the JSON structure
- name : Mandatory 
- userId : Manadatory + Unique
- email : Manadatory + Unique
- passworod : Mandatory
- userType : Optional, default value is CUSTOMER. Other possible value : ADMIN | ENGINEER
- userStatus : It reperesents the status of the user registered. Customer are by default approved. ADMIN and Engineers need approval from Admin. Possible values : APPROVED | PENDING | REJECTED

---
#### 2. Get user based on the userId

```sh
GET /crm/api/v1/users/{userId}

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0


Sample response body :
[
    {
        "name": "Vishwa",
        "userId": "Vish01",
        "email": "abc@xyz1.com",
        "userTypes": "ENGINEER",
        "userStatus": "APPROVED"
    }
]
```
#### 3. Update the user information- Type and Status
```sh
PUT localhost:8080/crm/api/v1/users/Vish01

Headers :
 Content-Type:application/json
 x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNjQ1NTA4NDY0LCJleHAiOjE2NDU1OTQ4NjR9.PgKiGRN_J8aDGwrBLOGhWUKArcfegDd76dEgGtV6Qh0


Sample request body :
{
        "name": "Vishwa",
        "userId": "Vish01",
        "email": "abc@xyz1.com",
        "userTypes": "ENGINEER",
        "userStatus": "APPROVED"
}

Sample response body :
{
    "message": "User record has been updated successfully"
}

```

###
POSTMAN collection [link](https://www.getpostman.com/collections/9168e824f523fb659502)

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com


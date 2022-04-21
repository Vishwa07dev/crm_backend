# CRM App backend [ Session 1 ]
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
* User Registration and User Login
    * Admin registration will be from the backend directly. No API support for the ADMIN user creation
    * Engineer registration will be supported through API, but it needs to be approved by the ADMIN
    * Customer registration will be supported through API with no approval needed from the ADMIN
    * API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls
    * API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls
    * API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls. Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN. Proper error message in the case ADMIN has yet not approved/rejected the registration request
    
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
#### 1. Sign Up request 

```sh
POST /crm/api/v1/auth/signup
Sample request body :
{
        "name": "Vishwa",
        "userId": "Vish07",
        "email" : "abc@xyz.com",
        "password" : "Welcome1",
        "userType" : "ENGINEER"
}

Sample response body :
{
    "name": "Vishwa",
    "userId": "Vish07",
    "email": "abc@xyz.com",
    "userTypes": "ENGINEER",
    "userStatus": "PENDING",
    "createdAt": "2022-02-20T04:47:43.842Z",
    "updatedAt": "2022-02-20T04:47:43.842Z"
}
```
Details about the JSON structure
- name : Mandatory 
- userId : Manadatory + Unique
- email : Manadatory + Unique
- passworod : Mandatory
- userType : Optional, default value is CUSTOMER. Other possible value : ADMIN | ENGINEER
- userStatus : It reperesents the status of the user registered. Customer are by default approved. ADMIN and Engineers need approval from Admin. Possible values : APPROVED | PENDING | REJECTED

---
#### 2. Login request

```sh
POST /crm/api/v1/auth/signin
Sample request body :
{
        "userId": "Vish01",
        "password" : "Welcome1"
    
}
Sample response body :
{
    "name": "Vishwa",
    "userId": "Vish01",
    "email": "abc@xyz1.com",
    "userTypes": "CUSTOMER",
    "userStatus": "APPROVED",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlZpc2gwMSIsImlhdCI6MTY0NTMzMjg3NiwiZXhwIjoxNjQ1NDE5Mjc2fQ.21IRt9VIL-suvP7Z_lamH1PcchOB1TJOhZPSpX9kqt8"
}
```
POSTMAN collection [link](https://www.getpostman.com/collections/9168e824f523fb659502)

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com




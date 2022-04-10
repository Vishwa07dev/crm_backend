<<<<<<< HEAD
# CRM App backend [ Session 1 ]
=======
# CRM App backend [ Session 2 ]
>>>>>>> 781e57e89cae409c5d8c7171c801a67a430b4e52
## _Learning the development of RESTful APIs for backend_ 

This code base contains logic/structure  for creating the Restful APIs for the CRM app
## Features
<<<<<<< HEAD
* User Registration and User Login
    * Admin registration will be from the backend directly. No API support for the ADMIN user creation
    * Engineer registration will be supported through API, but it needs to be approved by the ADMIN
    * Customer registration will be supported through API with no approval needed from the ADMIN
    * API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls
    * API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls
    * API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls. Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN. Proper error message in the case ADMIN has yet not approved/rejected the registration request
=======
* User Handling
    * API for getting the list of all users
    * EAPI for the gettig the user based on UserID
    * API for updating the user type and status
    * Authenticaing and Authorizing above APIs, so that only authenticated ADMIN user will be allowed to perform the above operations
    * ENGINEER/ADMIN user should be able to login successfully after the approval from ADMIN user
  
>>>>>>> 781e57e89cae409c5d8c7171c801a67a430b4e52
    
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

```sh
cd crm_backend
npm install
npm run devStart
```

## Rest endpoints
<<<<<<< HEAD
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
=======
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
>>>>>>> 781e57e89cae409c5d8c7171c801a67a430b4e52
```
Details about the JSON structure
- name : Mandatory 
- userId : Manadatory + Unique
- email : Manadatory + Unique
- passworod : Mandatory
- userType : Optional, default value is CUSTOMER. Other possible value : ADMIN | ENGINEER
- userStatus : It reperesents the status of the user registered. Customer are by default approved. ADMIN and Engineers need approval from Admin. Possible values : APPROVED | PENDING | REJECTED

---
<<<<<<< HEAD
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
=======
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
>>>>>>> 781e57e89cae409c5d8c7171c801a67a430b4e52
POSTMAN collection [link](https://www.getpostman.com/collections/9168e824f523fb659502)

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over kankvish@gmail.com

<<<<<<< HEAD


=======
>>>>>>> 781e57e89cae409c5d8c7171c801a67a430b4e52
